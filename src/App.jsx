import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ChatView from './components/ChatView'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuth } from './context/AuthContext'

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36)

const App = () => {
  const [messages, setMessages] = useState([])
  const [conversationId , setConversationId] = useState(generateId())

  const {user , loading} = useAuth()

  const addMessage = (message) => {
    setMessages(prev => [...prev, message])
    // if(message.ai){
    //   setRefreshTrigger(prev => prev+1)
    // }
  }

  const clearChat = () => {
    setMessages([])
    setConversationId(generateId())
  }

  const loadHistory = (historyMessages , selectedConversationId) => {
    // console.log("history Message",historyMessages)
    setMessages(historyMessages)
    if(selectedConversationId){
      setConversationId(selectedConversationId)
    }
  }

  if(loading){
    return(
      <div className='min-h-screen bg-base-100 flex items-center justify-center' data-theme='financegpt'>
        <span className='loading loading-spinner loading-lg text-primary'></span>
      </div>
    )
  }

  return (
    <Routes>
      <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
      <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
      <Route path='/' element={
        user ? (
          <div className='flex h-screen' data-theme='financegpt'>
            <Sidebar clearChat={clearChat} onLoadHistory={loadHistory}/>
            <ChatView messages={messages} addMessage={addMessage} conversationId={conversationId}/>
          </div>
        ) : (
          <Navigate to='/login' />
        )
      } />
    </Routes>
  )
}

export default App