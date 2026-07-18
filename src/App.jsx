import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ChatView from './components/ChatView'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuth } from './context/AuthContext'

const App = () => {
  const [messages, setMessages] = useState([])
  const {user , loading} = useAuth()

  const addMessage = (message) => {
    setMessages(prev => [...prev, message])
  }

  const clearChat = () => {
    setMessages([])
  }

  const loadHistory = (historyMessages) => {
    setMessages(historyMessages)
  }

  if(loading){
    return(
      <div className='min-h-screen bg-base-100 flex items-center justify-center' data-theme='dark'>
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
          <div className='flex h-screen' data-theme='dark'>
            <Sidebar clearChat={clearChat} onLoadHistory={loadHistory}/>
            <ChatView messages={messages} addMessage={addMessage} />
          </div>
        ) : (
          <Navigate to='/login' />
        )
      } />
    </Routes>
  )
}

export default App