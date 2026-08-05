import { ResponsiveContainer, LineChart , Line , XAxis , YAxis, Tooltip , CartesianGrid , Legend } from "recharts";

const LINE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']

const MultiStockChart = ({ chartData }) => {
    if(!chartData || !chartData.points || chartData.points.length === 0){
        return null
    }

    const {symbols , points} = chartData

    return (
    <div className='w-full bg-base-300/40 border border-base-300 rounded-xl p-4 my-3'>
      {/* Header */}
      <div className='flex items-center justify-between mb-3 px-1'>
        <div>
          <span className='text-xs font-semibold text-primary uppercase tracking-wider block'>
            Stock Comparison Analysis
          </span>
          <span className='text-sm font-bold text-base-content'>
            {symbols.join(' vs ')}
          </span>
        </div>
      </div>

      {/* Multi-Line Chart */}
      <div className='h-56 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={points} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#fff'
              }}
              formatter={(value, name) => [`$${Number(value).toFixed(2)}`, name]}
            />

            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
            />

            {symbols.map((symbol, index) => (
              <Line
                key={symbol}
                type='monotone'
                dataKey={symbol}
                name={symbol}
                stroke={LINE_COLORS[index % LINE_COLORS.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default MultiStockChart
