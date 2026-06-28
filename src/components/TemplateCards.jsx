const templates = [
  {
    title: 'Current Stock Price',
    prompt: 'What is the current price of Apple?',
    icon: '📈'
  },
  {
    title: 'Stock Performance',
    prompt: 'How has Tesla performed recently?',
    icon: '📊'
  },
  {
    title: 'Compare Stocks',
    prompt: 'Compare Apple and Google stocks',
    icon: '🔀'
  },
  {
    title: 'Buy Stocks',
    prompt: 'Buy 5 shares of Apple',
    icon: '🛒'
  },
  {
    title: 'Sell Stocks',
    prompt: 'Sell 2 shares of Apple',
    icon: '💰'
  },
  {
    title: 'View Portfolio',
    prompt: 'Show my portfolio',
    icon: '💼'
  },
]

const TemplateCards = ({ onSelect }) => {
  return (
    <div className='flex flex-col items-center justify-center h-full gap-8 py-8'>
      
      {/* Welcome */}
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-primary mb-2'>Welcome to FinanceGPT</h2>
        <p className='text-base-content/60'>Your AI-powered financial assistant</p>
      </div>

      {/* Cards */}
      <div className='grid grid-cols-2 gap-3 w-full max-w-2xl'>
        {templates.map((template, index) => (
          <button
            key={index}
            onClick={() => onSelect(template.prompt)}
            className='p-4 border border-base-300 rounded-xl hover:border-primary hover:bg-base-200 transition-all duration-200 text-left group'>
            <div className='flex items-center gap-2 mb-1'>
              <span className='text-xl'>{template.icon}</span>
              <p className='font-semibold text-sm group-hover:text-primary transition-colors'>
                {template.title}
              </p>
            </div>
            <p className='text-xs text-base-content/50'>{template.prompt}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TemplateCards