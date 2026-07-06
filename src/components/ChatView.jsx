import { useState, useRef, useEffect } from 'react'
import { MdSend } from 'react-icons/md'
import Message from './Message'
import TemplateCards from './TemplateCards'
import { sendMessage } from '../utils/api'

const ChatView = ({ messages, addMessage }) => {
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
      const response = await sendMessage(input)
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
      <div className='p-4 border-b border-base-300'>
        <h2 className='text-xl font-semibold'>Financial Assistant</h2>
        <p className='text-sm text-base-content/50'>Ask me about stocks, prices, and portfolio management</p>
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
            <div className='avatar placeholder'>
              <div className='w-8 rounded-full bg-primary text-primary-content'>
                <span className='text-xs'>AI</span>
              </div>
            </div>
            <div className='chat-bubble bg-base-200'>
              <span className='loading loading-dots loading-sm'></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </section>

      {/* Input */}
      <div className='p-4 border-t border-base-300'>
        <div className='flex gap-2 items-end'>
          <textarea
            ref={inputRef}
            className='textarea textarea-bordered flex-1 resize-none min-h-[48px] max-h-[120px]'
            placeholder='Ask about stocks, buy/sell shares, view portfolio...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className='btn btn-primary btn-square'
            onClick={handleSend}
            disabled={!input.trim() || loading}>
            <MdSend size={20} />
          </button>
        </div>
        <p className='text-xs text-base-content/30 mt-1'>Press Enter to send, Shift+Enter for new line</p>
      </div>
    </main>
  )
}

export default ChatView