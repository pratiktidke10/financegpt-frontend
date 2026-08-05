import ReactMarkdown from 'react-markdown'
import { MdPerson } from 'react-icons/md'
import { RiRobot2Line } from 'react-icons/ri'
import StockChart from './StockChart'
import MultiStockChart from './MultiStockChart'
import PortfolioChart from './PortfolioChart'

const Message = ({ message }) => {
  const { text, ai, createdAt } = message

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  let singleChartData = null
  let multiChartData = null
  let portfolioChartData = null
  let displayText = text

  if(ai && text){
    //Single Stock Chart
    const singleMatch = text.match(/```json\s*(\{[\s\S]*?"type":\s*"STOCK_CHART"[\s\S]*?\})\s*```/)
    if(singleMatch){
      try{
        singleChartData = JSON.parse(singleMatch[1])
        displayText = text.replace(singleMatch[0],'').trim()
      }catch(e){
        console.error('Failed to parse single chart JSON: ' , e)
      }
    }

    //Multi-Stock comparison chart
    const multiMatch = text.match(/```json\s*(\{[\s\S]*?"type":\s*"MULTI_STOCK_CHART"[\s\S]*?\})\s*```/)
    if (multiMatch) {
      try {
        multiChartData = JSON.parse(multiMatch[1])
        displayText = text.replace(multiMatch[0], '').trim()
      } catch (e) {
        console.error('Failed to parse multi chart JSON:', e)
      }
    }

    //Portfolio Asset allocation chart
    const portfolioMatch = text.match(/```json\s*(\{[\s\S]*?"type":\s*"PORTFOLIO_CHART"[\s\S]*?\})\s*```/)
    if(portfolioMatch){
      try {
        portfolioChartData = JSON.parse(portfolioMatch[1])
        displayText = text.replace(portfolioMatch[0],'').trim()
      } catch (e) {
        console.error('Failed to parse portfolio JSON: ', e)
      }
    }
  }

  return (
    <div className={`flex gap-3 items-start animate-fade-in ${ai ? '' : 'flex-row-reverse'}`}>

      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${ai ? 'bg-primary/20 border border-primary/30' : 'bg-secondary/20 border border-secondary/30'}`}>
        {ai
          ? <RiRobot2Line size={16} className='text-primary' />
          : <MdPerson size={16} className='text-secondary' />
        }
      </div>

      {/* Content */}
      <div className={`flex flex-col max-w-[85%] ${ai ? 'items-start' : 'items-end'}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          ai
            ? 'bg-base-200 border border-base-300 text-base-content rounded-tl-sm'
            : 'bg-primary text-primary-content rounded-tr-sm'
        }`}>

          {/* Render interactive chart if chartData exists */}
          {singleChartData && <StockChart chartData={singleChartData} />}

          {multiChartData && <MultiStockChart chartData={multiChartData} />}

          {portfolioChartData && <PortfolioChart chartData={portfolioChartData} />}

          <ReactMarkdown
            components={{
              p: ({ children }) => <p className='text-sm leading-relaxed whitespace-pre-wrap m-0 mb-2 last:mb-0'>{children}</p>,
              ul: ({ children }) => <ul className='list-disc list-inside text-sm space-y-1 my-2'>{children}</ul>,
              li: ({ children }) => <li className='text-sm'>{children}</li>,
              strong: ({ children }) => <strong className='font-semibold'>{children}</strong>,
              h3: ({ children }) => <h3 className='font-semibold text-sm mb-2 mt-3'>{children}</h3>,
            }}>
            {displayText}
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