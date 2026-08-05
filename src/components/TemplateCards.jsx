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
  }
]

const TemplateCards = ({ onSelect }) => {
  return (
    <div className='flex flex-col items-center justify-center h-full gap-8 py-8 animate-fade-in'>

      {/* Hero Header */}
      <div className='text-center space-y-3 px-4'>
        <div className='inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3.5 py-1 mb-1'>
          <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse'></span>
          <span className='text-primary text-[11px] font-semibold tracking-wider uppercase'>AI Powered</span>
        </div>
        
        <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight'>
          <span className='text-base-content'>Welcome to </span>
          <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>FinanceGPT</span>
        </h1>
        
        <p className='text-base-content/60 text-xs sm:text-sm max-w-md mx-auto leading-relaxed'>
          Your intelligent financial assistant. Ask anything about stocks, manage your portfolio, and get real-time market insights.
        </p>
      </div>

      {/* Suggestion Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-2xl px-4'>
        {templates.map((template, index) => (
          <button
            key={index}
            type='button'
            onClick={() => onSelect(template.prompt)}
            className='group p-4 bg-base-200/50 border border-base-300 rounded-2xl hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-200 text-left shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between'
          >
            <div>
              <span className='text-2xl mb-2 block group-hover:scale-110 transition-transform duration-200 origin-left'>
                {template.icon}
              </span>
              <p className='font-bold text-sm text-base-content group-hover:text-primary transition-colors'>
                {template.title}
              </p>
              <p className='text-xs text-base-content/50 mt-1 leading-normal'>
                {template.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Footer Branding */}
      <p className='text-[11px] text-base-content/30 tracking-wide font-mono'>
        Powered by Gemini AI + Alpha Vantage
      </p>
    </div>
  )
}

export default TemplateCards