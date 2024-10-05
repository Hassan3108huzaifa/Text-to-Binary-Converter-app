'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const textToBinary = (text: string): string => {
    return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
  }

  const binaryToText = (binary: string): string => {
    const binaryArray = binary.split(' ')
    return binaryArray.map(bin => String.fromCharCode(parseInt(bin, 2))).join('')
  }

  const handleConvertToBinary = () => {
    setError('')
    setOutput(textToBinary(input))
  }

  const handleConvertToText = () => {
    setError('')
    try {
      if (!/^[01\s]+$/.test(input)) {
        throw new Error('Invalid binary input. Please use only 0s and 1s.')
      }
      setOutput(binaryToText(input))
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24 bg-gray-100">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800">Text to Binary Converter</h1>
        <Textarea
          placeholder="Enter text or binary here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[80px] sm:min-h-[100px]"
        />
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Button onClick={handleConvertToBinary} className="w-full sm:w-auto">Convert to Binary</Button>
          <Button onClick={handleConvertToText} className="w-full sm:w-auto">Convert to Text</Button>
        </div>
        {error && <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>}
        <Textarea
          placeholder="Output will appear here..."
          value={output}
          readOnly
          className="min-h-[80px] sm:min-h-[100px]"
        />
      </div>
    </main>
  )
}