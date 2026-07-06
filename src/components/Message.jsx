import ReactMarkdown from 'react-markdown'
import { MdComputer, MdPerson } from 'react-icons/md'

const Message = ({ message }) => {
  const { text, ai, createdAt } = message

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`flex gap-3 items-start ${ai ? '' : 'flex-row-reverse'}`}>
      
      {/* Avatar */}
      <div className='avatar placeholder flex-shrink-0'>
        <div className={`w-8 rounded-full ${ai ? 'bg-primary text-primary-content' : 'bg-secondary text-secondary-content'}`}>
          {ai ? <MdComputer size={16} /> : <MdPerson size={16} />}
        </div>
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] ${ai ? '' : 'items-end flex flex-col'}`}>
        <div className={`rounded-2xl px-4 py-3 ${ai ? 'bg-base-200 text-base-content' : 'bg-primary text-primary-content'}`}>
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className='text-sm leading-relaxed whitespace-pre-wrap'>{children}</p>,
              ul: ({ children }) => <ul className='list-disc list-inside text-sm space-y-1 mt-1'>{children}</ul>,
              li: ({ children }) => <li className='text-sm'>{children}</li>,
              strong: ({ children }) => <strong className='font-semibold'>{children}</strong>,
            }}>
            {text}
          </ReactMarkdown>
        </div>
        <span className='text-xs text-base-content/30 mt-1 px-1'>
          {formatTime(createdAt)}
        </span>
      </div>
    </div>
  )
}

export default Message