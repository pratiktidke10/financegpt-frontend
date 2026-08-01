const templates = [
  {
    title: 'Stock Price',
    prompt: 'What is the current price of Apple?',
    icon: '📈',
    desc: 'Get real-time stock prices'
  },
  {
    title: 'Performance',
    prompt: 'How has Tesla performed recently?',
    icon: '📊',
    desc: 'Analyze weekly performance'
  },
  {
    title: 'Compare Stocks',
    prompt: 'Compare Apple and Google stocks',
    icon: '🔀',
    desc: 'Side by side comparison'
  },
  {
    title: 'Buy Stocks',
    prompt: 'Buy 5 shares of Apple',
    icon: '🛒',
    desc: 'Add to virtual portfolio'
  },
  {
    title: 'Sell Stocks',
    prompt: 'Sell 2 shares of Apple',
    icon: '💰',
    desc: 'Manage your holdings'
  },
  {
    title: 'My Portfolio',
    prompt: 'Show my portfolio',
    icon: '💼',
    desc: 'View your investments'
  },
]

const TemplateCards = ({ onSelect }) => {
  return (
    <div className='flex flex-col items-center justify-center h-full gap-10 py-8'>

      {/* Hero */}
      <div className='text-center space-y-3'>
        <div className='inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-2'>
          <span className='text-primary text-xs font-medium tracking-wide uppercase'>AI Powered</span>
        </div>
        <h1 className='text-4xl font-bold'>
          <span className='text-base-content'>Welcome to </span>
          <span className='text-primary'>FinanceGPT</span>
        </h1>
        <p className='text-base-content/50 text-sm max-w-md mx-auto'>
          Your intelligent financial assistant. Ask anything about stocks, manage your portfolio, and get real-time market insights.
        </p>
      </div>

      {/* Cards */}
      <div className='grid grid-cols-3 gap-3 w-full max-w-2xl'>
        {templates.map((template, index) => (
          <button
            key={index}
            onClick={() => onSelect(template.prompt)}
            className='group p-4 border border-base-300 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-left'>
            <span className='text-2xl mb-2 block'>{template.icon}</span>
            <p className='font-semibold text-sm text-base-content group-hover:text-primary transition-colors'>
              {template.title}
            </p>
            <p className='text-xs text-base-content/40 mt-0.5'>{template.desc}</p>
          </button>
        ))}
      </div>

      {/* Bottom hint */}
      <p className='text-xs text-base-content/30'>
        Powered by Gemini AI + Alpha Vantage
      </p>
    </div>
  )
}

export default TemplateCards