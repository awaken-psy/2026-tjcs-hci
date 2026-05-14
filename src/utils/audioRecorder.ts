const TARGET_SAMPLE_RATE = 16000

export function canRecordAudio() {
  return !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined'
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
  if (!AudioContextClass) {
    throw new Error('当前浏览器不支持音频处理，请使用新版 Chrome。')
  }
  return new AudioContextClass()
}

function downsample(channelData: Float32Array, sourceRate: number) {
  if (sourceRate === TARGET_SAMPLE_RATE) return channelData

  const ratio = sourceRate / TARGET_SAMPLE_RATE
  const length = Math.round(channelData.length / ratio)
  const result = new Float32Array(length)

  for (let i = 0; i < length; i++) {
    const start = Math.floor(i * ratio)
    const end = Math.min(Math.floor((i + 1) * ratio), channelData.length)
    let sum = 0
    let count = 0
    for (let j = start; j < end; j++) {
      sum += channelData[j]
      count++
    }
    result[i] = count > 0 ? sum / count : channelData[start] || 0
  }

  return result
}

function writeString(view: DataView, offset: number, value: string) {
  for (let i = 0; i < value.length; i++) {
    view.setUint8(offset + i, value.charCodeAt(i))
  }
}

function encodeWav(samples: Float32Array) {
  const buffer = new ArrayBuffer(44 + samples.length * 2)
  const view = new DataView(buffer)

  writeString(view, 0, 'RIFF')
  view.setUint32(4, 36 + samples.length * 2, true)
  writeString(view, 8, 'WAVE')
  writeString(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, TARGET_SAMPLE_RATE, true)
  view.setUint32(28, TARGET_SAMPLE_RATE * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(view, 36, 'data')
  view.setUint32(40, samples.length * 2, true)

  let offset = 44
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const sample = Math.max(-1, Math.min(1, samples[i]))
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
  }

  return new Blob([view], { type: 'audio/wav' })
}

export async function mediaBlobToWav(blob: Blob) {
  const audioContext = getAudioContext()
  try {
    const arrayBuffer = await blob.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0))
    const channelData = audioBuffer.getChannelData(0)
    const samples = downsample(channelData, audioBuffer.sampleRate)
    return encodeWav(samples)
  } finally {
    await audioContext.close()
  }
}

export class BrowserAudioRecorder {
  private stream: MediaStream | null = null
  private recorder: MediaRecorder | null = null
  private chunks: BlobPart[] = []

  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const preferredType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : ''
    this.recorder = new MediaRecorder(
      this.stream,
      preferredType ? { mimeType: preferredType } : undefined
    )
    this.chunks = []

    this.recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.chunks.push(event.data)
      }
    }

    this.recorder.start()
  }

  stop() {
    return new Promise<Blob>((resolve, reject) => {
      if (!this.recorder) {
        reject(new Error('录音尚未开始。'))
        return
      }

      this.recorder.onstop = async () => {
        try {
          const rawBlob = new Blob(this.chunks, {
            type: this.recorder?.mimeType || 'audio/webm',
          })
          resolve(await mediaBlobToWav(rawBlob))
        } catch (error) {
          reject(error)
        } finally {
          this.cleanup()
        }
      }
      this.recorder.stop()
    })
  }

  abort() {
    if (this.recorder && this.recorder.state !== 'inactive') {
      this.recorder.stop()
    }
    this.cleanup()
  }

  private cleanup() {
    this.stream?.getTracks().forEach((track) => track.stop())
    this.stream = null
    this.recorder = null
    this.chunks = []
  }
}
