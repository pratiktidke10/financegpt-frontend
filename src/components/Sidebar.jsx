import { useState } from 'react'
import { MdDelete, MdMenu, MdClose } from 'react-icons/md'
import { RiStockLine } from 'react-icons/ri'

const Sidebar = ({ clearChat }) => {
  const [open, setOpen] = useState(true)

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

      {/* Footer */}
      {open && (
        <div className='p-4 text-xs text-base-content/50 text-center'>
          Powered by Gemini AI
        </div>
      )}
    </aside>
  )
}

export default Sidebar