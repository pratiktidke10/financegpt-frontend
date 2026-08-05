import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const StockChart = ({ chartData }) => {
  if (!chartData || !chartData.points || chartData.points.length === 0) {
    return null
  }

  const { symbol, points } = chartData

  const firstPrice = points[0]?.price || 0
  const lastPrice = points[points.length - 1]?.price || 0
  const priceChange = lastPrice - firstPrice
  const percentChange = firstPrice > 0 ? (priceChange / firstPrice) * 100 : 0
  const isPositive = priceChange >= 0

  const strokeColor = isPositive ? '#22c55e' : '#ef4444'
  const gradientId = `gradient-${symbol?.replace(/[^a-zA-Z0-9]/g, '') || 'stock'}`

  return (
    <div className='w-full bg-base-300/40 border border-base-300 rounded-xl p-4 my-3'>
      {/* Chart Header */}
      <div className='flex items-center justify-between mb-3 px-1'>
        <div>
          <span className='text-xs font-semibold text-primary uppercase tracking-wider block'>
            {symbol} Trend Analysis
          </span>
          <span className='text-lg font-bold text-base-content'>
            ${lastPrice.toFixed(2)}
          </span>
        </div>
        <div className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
          isPositive 
            ? 'bg-success/10 text-success border-success/20' 
            : 'bg-error/10 text-error border-error/20'
        }`}>
          {isPositive ? '▲ +' : '▼ '}{percentChange.toFixed(2)}%
        </div>
      </div>

      {/* Interactive Chart */}
      <div className='h-48 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={points} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor={strokeColor} stopOpacity={0.35} />
                <stop offset='95%' stopColor={strokeColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray='3 3' stroke='rgba(255, 255, 255, 0.05)' />

            <XAxis
              dataKey='date'
              tick={{ fontSize: 10, fill: 'rgba(255, 255, 255, 0.4)' }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={['auto', 'auto']}
              tick={{ fontSize: 10, fill: 'rgba(255, 255, 255, 0.4)' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${val}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#1d232a',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#fff'
              }}
              formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
            />

            <Area
              type='monotone'
              dataKey='price'
              stroke={strokeColor}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StockChart