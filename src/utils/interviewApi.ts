import type { ChatMessage } from '@/types'

interface AsrResponse {
  text: string
}

interface ReplyResponse {
  reply: string
}

async function parseApiError(response: Response) {
  const payload = await response.json().catch(() => null)
  return payload?.error || `请求失败 (${response.status})`
}

export async function transcribeAnswer(audio: Blob): Promise<string> {
  const form = new FormData()
  form.append('audio', audio, 'answer.wav')

  const response = await fetch('/api/asr', {
    method: 'POST',
    body: form,
  })

  if (!response.ok) {
    throw new Error(await parseApiError(response))
  }

  const payload = (await response.json()) as AsrResponse
  if (!payload.text?.trim()) {
    throw new Error('没有识别到有效语音，请重新回答。')
  }
  return payload.text.trim()
}

export async function requestInterviewReply(options: {
  messages: ChatMessage[]
  questionIndex: number
  totalQuestions: number
  jobTitle?: string
  level?: string
}): Promise<string> {
  const response = await fetch('/api/interview/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  })

  if (!response.ok) {
    throw new Error(await parseApiError(response))
  }

  const payload = (await response.json()) as ReplyResponse
  if (!payload.reply?.trim()) {
    throw new Error('AI 没有返回有效追问，请稍后重试。')
  }
  return payload.reply.trim()
}
