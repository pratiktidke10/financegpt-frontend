import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatView from './components/ChatView'

const App = () => {
  const [messages, setMessages] = useState([])

  const addMessage = (message) => {
    setMessages(prev => [...prev, message])
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className='flex h-screen' data-theme='dark'>
      <Sidebar clearChat={clearChat} />
      <ChatView messages={messages} addMessage={addMessage} />
    </div>
  )
}

export default App