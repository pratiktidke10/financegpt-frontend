import { ResponsiveContainer, PieChart, Pie , Cell, Tooltip, Legend } from "recharts";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4']

const PortfolioChart = ({ chartData }) => {
    if(!chartData || !chartData.holdings || chartData.holdings.length === 0){
        return null;
    }

    const { holdings , totalValue } = chartData;

    return (
    <div className='w-full bg-base-300/40 border border-base-300 rounded-xl p-4 my-3'>
      {/* Portfolio Header */}
      <div className='flex items-center justify-between mb-2 px-1'>
        <div>
          <span className='text-xs font-semibold text-primary uppercase tracking-wider block'>
            Asset Allocation
          </span>
          <span className='text-lg font-bold text-base-content'>
            ${totalValue.toFixed(2)}
          </span>
        </div>
        <div className='text-xs font-semibold px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20'>
          {holdings.length} Assets
        </div>
      </div>

      {/* Donut Chart */}
      <div className='h-52 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={holdings}
              cx='50%'
              cy='50%'
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey='value'
              nameKey='symbol'
            >
              {holdings.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1d232a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#fff'
              }}
              formatter={(value, name) => [`$${Number(value).toFixed(2)}`, `${name} Value`]}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              formatter={(value) => <span className='text-xs font-medium text-base-content/80'>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PortfolioChart