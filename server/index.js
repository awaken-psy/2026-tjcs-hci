import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import OpenAI from "openai";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});

const port = Number(process.env.PORT || 3001);
const aliyunHost =
  process.env.ALIYUN_NLS_HOST || "https://nls-gateway-cn-shanghai.aliyuncs.com";
const deepseekModel = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || "missing-deepseek-key",
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
});

app.use(cors());
app.use(express.json({ limit: "1mb" }));

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    const error = new Error(`Missing required environment variable: ${name}`);
    error.statusCode = 500;
    throw error;
  }
  return value;
}

function normalizeMessages(messages = []) {
  return messages
    .filter(
      (msg) =>
        msg &&
        (msg.role === "ai" || msg.role === "user") &&
        typeof msg.content === "string",
    )
    .slice(-10)
    .map((msg) => ({
      role: msg.role === "ai" ? "assistant" : "user",
      content: msg.content.trim(),
    }))
    .filter((msg) => msg.content);
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    model: deepseekModel,
    asr: "aliyun-nls-one-shot",
  });
});

app.post("/api/asr", upload.single("audio"), async (req, res, next) => {
  try {
    const token = requireEnv("ALIYUN_NLS_TOKEN");
    const appkey = requireEnv("ALIYUN_NLS_APP_KEY");

    if (!req.file?.buffer?.length) {
      return res.status(400).json({ error: "请先录制一段语音。" });
    }

    const endpoint = new URL("/stream/v1/asr", aliyunHost);
    endpoint.searchParams.set("appkey", appkey);
    endpoint.searchParams.set("format", "wav");
    endpoint.searchParams.set("sample_rate", "16000");
    endpoint.searchParams.set("enable_punctuation_prediction", "true");
    endpoint.searchParams.set("enable_inverse_text_normalization", "true");

    const asrResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "X-NLS-Token": token,
      },
      body: req.file.buffer,
    });

    const payload = await asrResponse.json().catch(() => null);

    if (!asrResponse.ok || !payload || Number(payload.status) !== 20000000) {
      return res.status(502).json({
        error: payload?.message || "语音转写失败，请稍后重试。",
        details: payload,
      });
    }

    const text = String(payload.result || "").trim();
    if (!text) {
      return res
        .status(422)
        .json({ error: "没有识别到有效语音，请靠近麦克风再试。" });
    }

    res.json({ text });
  } catch (error) {
    next(error);
  }
});

app.post("/api/interview/reply", async (req, res, next) => {
  try {
    requireEnv("DEEPSEEK_API_KEY");

    const messages = normalizeMessages(req.body?.messages);
    if (messages.length === 0) {
      return res.status(400).json({ error: "缺少面试上下文。" });
    }

    const jobTitle = String(req.body?.jobTitle || "前端开发工程师");
    const level = String(req.body?.level || "中级");
    const questionIndex = Number(req.body?.questionIndex || 1);
    const totalQuestions = Number(req.body?.totalQuestions || 10);

    const completion = await deepseek.chat.completions.create({
      model: deepseekModel,
      temperature: 0.7,
      max_tokens: 220,
      messages: [
        {
          role: "system",
          content: [
            "你是一名中文 AI 模拟面试官。",
            `当前岗位：${jobTitle}，难度：${level}，进度：第 ${questionIndex}/${totalQuestions} 题。`,
            "你需要根据候选人的最新回答继续追问。",
            "每次只问一个问题，不要给分，不要总结报告。",
            "语气专业、自然、简洁，回复控制在 80 到 140 个中文字符，适合语音朗读。",
          ].join("\n"),
        },
        ...messages,
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(502).json({ error: "AI 没有返回有效回复。" });
    }

    res.json({ reply });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  const status = error.statusCode || 500;
  console.error(error);
  res.status(status).json({
    error: error.message || "服务暂时不可用，请稍后重试。",
  });
});

app.listen(port, () => {
  console.log(
    `AI interviewer API server listening on http://localhost:${port}`,
  );
});
