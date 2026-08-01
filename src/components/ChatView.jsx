import { useState, useRef, useEffect } from 'react'
import { MdSend } from 'react-icons/md'
import Message from './Message'
import TemplateCards from './TemplateCards'
import { sendMessage } from '../utils/api'

const ChatView = ({ messages, addMessage, conversationId }) => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = {
      id: Date.now(),
      text: input,
      ai: false,
      createdAt: Date.now()
    }

    addMessage(userMessage)
    setInput('')
    setLoading(true)

    try {
      const response = await sendMessage(input , conversationId)
      if (!response) return
      const aiMessage = {
        id: Date.now() + 1,
        text: response,
        ai: true,
        createdAt: Date.now()
      }
      addMessage(aiMessage)
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, something went wrong. Please try again.',
        ai: true,
        createdAt: Date.now()
      }
      addMessage(errorMessage)
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <main className='flex flex-col flex-1 h-screen bg-base-100'>

      {/* Header */}
      <div className='p-4 border-b border-base-300 flex items-center gap-3'>
        <div className='w-2 h-2 rounded-full bg-success animate-pulse'></div>
        <div>
          <h2 className='text-lg font-semibold'>Financial Assistant</h2>
          <p className='text-xs text-base-content/40'>Powered by Gemini AI + Alpha Vantage</p>
        </div>
      </div>

      {/* Messages */}
      <section className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.length === 0 ? (
          <TemplateCards onSelect={(prompt) => setInput(prompt)} />
        ) : (
          messages.map(message => (
            <Message key={message.id} message={message} />
          ))
        )}

        {loading && (
        <div className='flex gap-3 items-start'>
          <div className='flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center'>
            <span className='loading loading-spinner loading-xs text-primary'></span>
          </div>
          <div className='bg-base-200 border border-base-300 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[200px]'>
            <div className='flex flex-col gap-2'>
              <div className='h-2 bg-base-300 rounded animate-pulse w-32'></div>
              <div className='h-2 bg-base-300 rounded animate-pulse w-24'></div>
              <div className='h-2 bg-base-300 rounded animate-pulse w-28'></div>
            </div>
          </div>
        </div>
        )}

        <div ref={messagesEndRef} />
      </section>

      {/* Input */}
      <div className='p-4 border-t border-base-300 bg-base-100'>
        <div className='flex gap-2 items-end max-w-3xl mx-auto'>
          <div className='relative flex-1'>
            <textarea
              ref={inputRef}
              className='w-full bg-base-200 border border-base-300 focus:border-primary/50 focus:outline-none rounded-xl px-4 py-3 text-sm resize-none min-h-[48px] max-h-[120px] text-base-content placeholder:text-base-content/30 transition-colors'
              placeholder='Ask about stocks, buy/sell shares, view portfolio...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
          </div>
          <button
            className='btn btn-primary btn-square rounded-xl'
            onClick={handleSend}
            disabled={!input.trim() || loading}>
            {loading
              ? <span className='loading loading-spinner loading-sm'></span>
              : <MdSend size={18} />
            }
          </button>
        </div>
        <p className='text-xs text-base-content/30 mt-2 text-center'>
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </main>
  )
}

export default ChatView