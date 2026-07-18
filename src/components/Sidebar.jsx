import { useEffect, useState } from 'react'
import { MdDelete, MdMenu, MdClose } from 'react-icons/md'
import { RiStockLine } from 'react-icons/ri'
import { useAuth } from '../context/AuthContext'
import { fetchHistory } from '../utils/api'

const Sidebar = ({ clearChat, onLoadHistory }) => {
  const [open, setOpen] = useState(true)
  const [history , setHistory] = useState([])
  const { user, logout } = useAuth()

  useEffect (() => {
    if(user){
      loadHistory()
    }
  } , [user])

  const loadHistory = async () => {
    try {
      const data = await fetchHistory()
      setHistory(data)
    } catch (error) {
      console.error('Failed to load history: ',error)
    }
  }

  const handleLoadHistory = (item) => {
    onLoadHistory([
      {
        id: item.id + '_user',
        text: item.userMessage,
        ai: false,
        createdAt: new Date(item.createdAt).getTime()
      },
      {
        id: item.id + '_ai',
        text: item.aiResponse,
        ai: true,
        createdAt: new Date(item.createdAt).getTime()
      }
    ])
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
            <RiStockLine size={24} className='text-primary' />
            <h1 className='text-lg font-bold text-primary'>FinanceGPT</h1>
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
      <ul className='menu p-2 flex-1'>
        <li>
          <a onClick={clearChat} className='flex items-center gap-2'>
            <MdDelete size={18} />
            {open && <span>Clear Chat</span>}
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
                <button
                  key={item.id}
                  onClick={() => handleLoadHistory(item)}
                  className='w-full text-left p-2 rounded-lg hover:bg-base-300 transition-colors mb-1'>
                  <p className='text-xs font-medium truncate'>{item.userMessage}</p>
                  <p className='text-xs text-base-content/40'>{formatDate(item.createdAt)}</p>
                </button>
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