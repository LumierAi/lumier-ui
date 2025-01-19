import type { Ref } from 'vue'

export const JSON_STREAM_SEPARATOR = 'JSON::'

type ReadStreamOptions = Partial<{
  parseMarkdown: boolean
}>

/**
 * Reads a stream and saves it into the ref value.
 *
 * @async
 * @param {ReadableStream} stream - The stream to read.
 * @param {Ref<string>} input - A Vue ref to store the read data.
 */

export default async function readStream<T = string>(stream: ReadableStream, input: Ref<string> | ((chunk: string | T) => void), options: ReadStreamOptions = {}): Promise<void> {
  const reader = stream.getReader()
  let jsonText: string = ''
  let wholeText: string = ''

  const handleTextChunk = async (chunk: string) => {
    if (chunk) {
      console.log('Received chunk:', chunk)
      wholeText += chunk
      if (typeof input === 'function') {
        input(chunk)
      }
      else {
        if (options.parseMarkdown) {
          try {
            const parsedMarkdown = await useMarkdown(wholeText)
            console.log('Parsed markdown:', parsedMarkdown)
            input.value = parsedMarkdown || wholeText
          }
          catch (error) {
            console.error('Error parsing markdown:', error)
            input.value = wholeText
          }
        }
        else {
          input.value = wholeText
        }
      }
      if (typeof input === 'object' && 'value' in input) {
        console.log('Updated input value:', input.value)
      }
    }
    else {
      console.error('Could not parse chunk', chunk)
    }
  }

  const decodeChunk = (chunk: Uint8Array) => {
    let jsonChunk = ''
    let textChunk = ''
    const decodedChunk = new TextDecoder('utf-8').decode(chunk)
    // Corrupted json chunk as example: `B2YmtrWktVa1JWQ2ZBQ0FBIiwiaWQiOiJmY18xIn0%3D"}]}The`
    if (/\]\}[^\W_]/.test(decodedChunk)) {
      const indexToSplit = decodedChunk.indexOf(']}') + 2
      jsonChunk = decodedChunk.slice(0, indexToSplit)
      textChunk = decodedChunk.slice(indexToSplit)
    }
    // Corrupted json chunk as example: `}the ....`
    else if (/^\}\w+/.test(decodedChunk)) {
      jsonChunk = '}'
      textChunk = decodedChunk.slice(1)
    }
    else if ((jsonText || decodedChunk.startsWith(JSON_STREAM_SEPARATOR))) {
      jsonChunk = decodedChunk.replace(JSON_STREAM_SEPARATOR, '')
    }
    else {
      textChunk = decodedChunk
    }

    return {
      jsonChunk,
      textChunk,
    }
  }
  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      break
    }
    const { textChunk, jsonChunk } = decodeChunk(value)
    if (typeof input === 'function' && jsonChunk) {
      jsonText += jsonChunk
      try {
        const parsedJson = JSON.parse(jsonText)
        jsonText = ''
        input(parsedJson)
      }
      catch (e) {
        console.error('Could not parse JSON chunk', jsonText)
      }
    }
    if (textChunk) {
      handleTextChunk(textChunk)
    }
  }
}
