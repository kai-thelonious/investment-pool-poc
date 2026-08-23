import { PieChart as PieIcon } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { kamiTheme } from '../../constants/theme';
import { PortfolioItem } from '../../data/mockData';

interface AssetBreakdownChartProps {
  portfolio: PortfolioItem[];
}

export default function AssetBreakdownChart({ portfolio }: AssetBreakdownChartProps) {
  return (
    <div className={`${kamiTheme.cardBg} p-5 sm:p-8 rounded-xl border ${kamiTheme.cardBorder}`}>
      <h2 className="text-lg sm:text-xl font-normal mb-1 flex items-center gap-2 text-[#141413]">
        <PieIcon className="text-[#1B365D]" size={18} /> Asset Breakdown
      </h2>
      <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mb-4 sm:mb-6`}>
        Current deployment of capital across active vehicles.
      </p>

      <div className="h-56 sm:h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={portfolio}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {portfolio.map((_, index) => (
                <Cell key={`cell-${index}`} fill={kamiTheme.piePalette[index % kamiTheme.piePalette.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#FAF9F5',
                borderColor: '#E8E6DC',
                borderRadius: '0.375rem',
                fontFamily: 'serif',
                fontSize: '12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-4 font-sans text-[11px] sm:text-xs">
        {portfolio.map((item, index) => (
          <div key={item.name} className="flex items-center gap-1.5 bg-[#FAF9F5] px-2.5 py-1 rounded border border-[#E8E6DC]">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: kamiTheme.piePalette[index % kamiTheme.piePalette.length] }}></span>
            <span className={kamiTheme.textSecondary}>{item.name}</span>
            <span className={`font-semibold ${kamiTheme.textPrimary}`}>(${item.value.toLocaleString()})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
