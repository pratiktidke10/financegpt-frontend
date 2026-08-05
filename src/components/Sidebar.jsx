import { useEffect, useState } from 'react'
import { MdDelete, MdMenu, MdClose, MdAdd, MdMoreHoriz, MdLogout, MdAccountBalanceWallet, MdVerified } from 'react-icons/md'
import { useAuth } from '../context/AuthContext'
import { deleteConversation, fetchConversationDetails, fetchHistory } from '../utils/api'
import logo from '../assets/logo.svg'

const Sidebar = ({ clearChat, onLoadHistory, refreshTrigger, onSelectQuickAction }) => {
  const [open, setOpen] = useState(true)
  const [history, setHistory] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    if (user) {
      loadHistory()
    }
  }, [user, refreshTrigger])

  const loadHistory = async () => {
    try {
      const data = await fetchHistory()
      setHistory(data)
    } catch (error) {
      console.error('Failed to load history: ', error)
    }
  }

  const handleLoadHistory = async (item) => {
    try {
      const fullMessages = await fetchConversationDetails(item.conversationId)
      onLoadHistory(fullMessages, item.conversationId)
    } catch (error) {
      console.error('Failed to load conversation details', error)
    }
  }

  const handleDeleteHistory = async (e, conversationId) => {
    e.stopPropagation()
    try {
      await deleteConversation(conversationId)
      await loadHistory()
    } catch (error) {
      console.error('Failed to delete conversation: ', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <aside className={`${open ? 'w-64' : 'w-16'} bg-base-200 flex flex-col h-screen transition-all duration-300 shadow-lg relative`}>
      
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

      {/* Updated Footer Profile Section */}
      <div className='p-3 border-t border-base-300 relative mt-auto'>
        
        {/* Popover Menu */}
        {menuOpen && (
          <div 
            className={`absolute bottom-16 ${open ? 'left-3 right-3' : 'left-16 w-48'} bg-base-300 border border-base-100 rounded-xl shadow-2xl p-1.5 z-50 animate-fade-in`}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <div className="px-3 py-2 border-b border-base-200/60 mb-1">
              <p className="text-[10px] text-base-content/50 uppercase font-semibold">Signed in as</p>
              <p className="text-xs font-bold text-base-content truncate">{user}</p>
            </div>

            <div className="px-3 py-1.5 flex items-center justify-between text-[11px] text-base-content/60">
              <span>Account</span>
              <span className="badge badge-primary badge-xs font-semibold">Pro Trader</span>
            </div>

            {onSelectQuickAction && (
              <button
                onClick={() => {
                  setMenuOpen(false)
                  onSelectQuickAction('Show my portfolio')
                }}
                className="w-full mt-1 px-3 py-2 text-left text-xs text-base-content/80 hover:bg-base-200 rounded-lg flex items-center gap-2 transition-colors"
              >
                <MdAccountBalanceWallet size={16} className="text-primary" />
                My Portfolio
              </button>
            )}

            <button
              onClick={logout}
              className="w-full px-3 py-2 text-left text-xs text-error hover:bg-error/10 rounded-lg flex items-center gap-2 transition-colors mt-1"
            >
              <MdLogout size={16} />
              Log out
            </button>
          </div>
        )}

        {/* Profile Trigger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`w-full flex items-center ${open ? 'justify-between p-2' : 'justify-center p-1'} rounded-xl hover:bg-base-300 transition-colors group text-left`}
        >
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-bold text-xs flex-shrink-0">
              {user ? user.charAt(0).toUpperCase() : 'U'}
            </div>
            {open && (
              <div className="truncate">
                <p className="text-xs font-semibold text-base-content truncate">{user}</p>
                <p className="text-[10px] text-base-content/40 flex items-center gap-1">
                  <MdVerified className="text-primary" size={10} /> FinanceGPT
                </p>
              </div>
            )}
          </div>
          {open && <MdMoreHoriz size={18} className="text-base-content/40 group-hover:text-base-content transition-colors flex-shrink-0" />}
        </button>

      </div>
    </aside>
  )
}

export default Sidebar