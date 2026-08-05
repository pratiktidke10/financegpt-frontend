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

  // Auto-resize textarea as content expands
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`
    }
  }, [input])

  const handleSend = async (customPrompt) => {
    const textToSend = customPrompt || input
    if (!textToSend.trim() || loading) return

    // 1. Create ISO Timestamp string for uniform local time parsing
    const currentIsoTime = new Date().toISOString()

    const userMessage = {
      id: `user-${Date.now()}`,
      text: textToSend,
      ai: false,
      createdAt: currentIsoTime
    }

    addMessage(userMessage)
    setInput('')
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }
    setLoading(true)

    try {
      const response = await sendMessage(textToSend, conversationId)
      if (!response) return

      const aiMessage = {
        id: `ai-${Date.now()}`,
        text: response,
        ai: true,
        createdAt: new Date().toISOString()
      }
      addMessage(aiMessage)
    } catch (error) {
      const errorMessage = {
        id: `err-${Date.now()}`,
        text: 'Sorry, something went wrong. Please try again.',
        ai: true,
        createdAt: new Date().toISOString()
      }
      addMessage(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTemplateSelect = (prompt) => {
    handleSend(prompt)
  }

  return (
    <main className='flex flex-col flex-1 h-screen bg-base-100 overflow-hidden'>

      {/* Header */}
      <div className='p-4 border-b border-base-300 flex items-center justify-between bg-base-100/80 backdrop-blur-md z-10'>
        <div className='flex items-center gap-3'>
          <div className='w-2 h-2 rounded-full bg-success animate-pulse'></div>
          <div>
            <h2 className='text-sm font-bold text-base-content'>Financial Assistant</h2>
            <p className='text-[11px] text-base-content/40'>Powered by Gemini AI + Alpha Vantage</p>
          </div>
        </div>
      </div>

      {/* Messages Feed */}
      <section className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.length === 0 ? (
          <TemplateCards onSelect={handleTemplateSelect} />
        ) : (
          messages.map(message => (
            <Message key={message.id || message.createdAt} message={message} />
          ))
        )}

        {/* Loading State Skeleton */}
        {loading && (
          <div className='flex gap-3 items-start animate-fade-in'>
            <div className='flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center'>
              <span className='loading loading-spinner loading-xs text-primary'></span>
            </div>
            <div className='bg-base-200 border border-base-300 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[220px]'>
              <div className='flex flex-col gap-2'>
                <div className='h-2 bg-base-300 rounded animate-pulse w-36'></div>
                <div className='h-2 bg-base-300 rounded animate-pulse w-24'></div>
                <div className='h-2 bg-base-300 rounded animate-pulse w-28'></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </section>

      {/* Input Box Footer */}
      <div className='p-4 border-t border-base-300 bg-base-100'>
        <div className='max-w-3xl mx-auto flex flex-col gap-1.5'>
          <div className='flex gap-2 items-end bg-base-200 border border-base-300 focus-within:border-primary/50 rounded-2xl p-2 transition-all shadow-sm'>
            <textarea
              ref={inputRef}
              className='flex-1 bg-transparent border-0 focus:outline-none px-2 py-1 text-sm resize-none min-h-[38px] max-h-[120px] text-base-content placeholder:text-base-content/30 leading-relaxed'
              placeholder='Ask about stocks, buy/sell shares, view portfolio...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              className='btn btn-primary btn-sm btn-square rounded-xl flex-shrink-0 mb-0.5'
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              title='Send message'
            >
              {loading ? (
                <span className='loading loading-spinner loading-xs'></span>
              ) : (
                <MdSend size={16} />
              )}
            </button>
          </div>

          <div className='flex items-center justify-between px-2 text-[11px] text-base-content/40'>
            <span>FinanceGPT</span>
            <span>Press <kbd className='kbd kbd-xs bg-base-300 text-base-content/70 border-0'>Enter ↵</kbd> to send</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ChatView