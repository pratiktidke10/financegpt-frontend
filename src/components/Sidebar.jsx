import { useEffect, useState } from 'react'
import { MdDelete, MdMenu, MdClose, MdAdd } from 'react-icons/md'
import { RiStockLine } from 'react-icons/ri'
import { useAuth } from '../context/AuthContext'
import { deleteConversation, fetchConversationDetails, fetchHistory } from '../utils/api' // Fixed spelling here
import logo from '../assets/logo.svg'

const Sidebar = ({ clearChat, onLoadHistory, refreshTrigger  }) => {
  const [open, setOpen] = useState(true)
  const [history , setHistory] = useState([])
  const { user, logout } = useAuth()

  useEffect(() => {
    if (user) {
      loadHistory()
    }
  }, [user])

  useEffect(() => {
    if (!user) return
    const interval = setInterval(() => {
      loadHistory()
    }, 10000)
    return () => clearInterval(interval)
  }, [user])

  const loadHistory = async () => {
    try {
      const data = await fetchHistory()
      setHistory(data)
    } catch (error) {
      console.error('Failed to load history: ',error)
    }
  }

  const handleLoadHistory = async(item) => {
    try{
      const fullMessages = await fetchConversationDetails(item.conversationId) // Fixed spelling here
      onLoadHistory(fullMessages , item.conversationId)
    }catch (error){
      console.error('Failed to load conversation details', error)
    }
  }

  const handleDeleteHistory = async (e, conversationId) => {
    e.stopPropagation() // Fixed spelling from stopPropogation
    try {
      await deleteConversation(conversationId)
      await loadHistory() // Added parentheses to execute the function
    } catch (error) {
      console.error("Failed to delete conversation: " , error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString([] ,{
      month : 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <aside className={`${open ? 'w-64' : 'w-16'} bg-base-200 flex flex-col h-screen transition-all duration-300 shadow-lg`}>
      
      {/* Header */}
      <div className='flex items-center justify-between p-4'>
        {open && (
          <div className='flex items-center gap-2'>
            <img src={logo} alt='FinanceGPT' className='w-7 h-7' />
            <h1 className='text-base font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
              FinanceGPT
            </h1>
          </div>
        )}
        <button
          className='btn btn-ghost btn-sm btn-square'
          onClick={() => setOpen(!open)}>
          {open ? <MdClose size={18} /> : <MdMenu size={18} />}
        </button>
      </div>

      <div className='divider my-0' />

      {/* Menu */}
      <ul className='menu p-2'>
        <li>
          <a onClick={clearChat} className='flex items-center gap-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors cursor-pointer'>
            <MdAdd size={18} />
            {open && <span className='text-sm'>New Chat</span>}
          </a>
        </li>
      </ul>

      {/* Chat History */}
      {open && (
        <>
          <div className='divider my-0' />
          <div className='flex-1 overflow-y-auto p-2'>
            <p className='text-xs text-base-content/40 px-2 py-1 uppercase font-semibold'>
              Recent Chats
            </p>
            {history.length === 0 ? (
              <p className='text-xs text-base-content/30 px-2 py-2'>No history yet</p>
            ) : (
              history.map((item) => (
                <div
                  key={item.conversationId}
                  onClick={() => handleLoadHistory(item)}
                  className='group flex items-center justify-between p-2 rounded-lg hover:bg-base-300 transition-colors mb-1 cursor-pointer'>
                  <div className='overflow-hidden pr-2 flex-1'>
                    <p className='text-xs font-medium truncate'>{item.firstMessage}</p>
                    <p className='text-xs text-base-content/40'>{formatDate(item.createdAt)}</p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteHistory(e, item.conversationId)}
                    className='opacity-0 group-hover:opacity-100 p-1 hover:text-error text-base-content/40 transition-opacity rounded'
                    title='Delete chat'>
                    <MdDelete size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Footer */}
      {open && (
      <div className='p-4 border-t border-base-300'>
        <p className='text-xs text-base-content/50 mb-2'>Logged in as <span className='text-primary font-semibold'>{user}</span></p>
        <button onClick={logout} className='btn btn-ghost btn-xs w-full'>Logout</button>
        <p className='text-xs text-base-content/30 text-center mt-2'>Powered by Gemini AI</p>
      </div>
    )}
    </aside>
  )
}

export default Sidebar