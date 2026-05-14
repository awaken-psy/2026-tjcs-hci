# AI 面试功能本地运行说明

该功能把面试页语音输入接入真实服务：

1. 前端用浏览器麦克风录音，并转换为 16kHz 单声道 WAV。
2. 本地 Node 服务调用阿里云智能语音交互一句话识别，把音频转成文本。
3. 本地 Node 服务把转写文本和最近对话上下文发给 DeepSeek，生成下一轮面试追问。
4. 前端展示 AI 回复，并继续使用浏览器 `speechSynthesis` 朗读。

## 环境变量

在 `.env.local` 文件中，填写：

```bash
PORT=3001
ALIYUN_NLS_TOKEN=your_aliyun_nls_token
ALIYUN_NLS_APP_KEY=your_aliyun_nls_app_key
ALIYUN_NLS_HOST=https://nls-gateway-cn-shanghai.aliyuncs.com
DEEPSEEK_API_KEY=your_deepseek_api_key
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
```

## 启动

开两个终端：

```bash
npm run server
```

```bash
npm run dev
```

Vite 已配置 `/api` 代理到 `http://localhost:3001`。

## 当前限制

- 单次语音回答最长 60 秒，超时会自动停止并转写。
- v1 只接入面试页的语音输入和 AI 追问，反馈报告仍使用现有静态页面。
- API Key 只在本地后端读取，不要写入前端代码。
