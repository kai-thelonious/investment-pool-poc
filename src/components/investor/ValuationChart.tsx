import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { kamiTheme } from '../../constants/theme';
import { FundHistoryItem } from '../../data/mockData';

interface ValuationChartProps {
  fundHistory: FundHistoryItem[];
}

export default function ValuationChart({ fundHistory }: ValuationChartProps) {
  return (
    <div
      className={`lg:col-span-2 ${kamiTheme.cardBg} p-5 sm:p-8 rounded-xl border ${kamiTheme.cardBorder}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-normal text-[#141413]">Fund Valuation Curve</h2>
        <span className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textMuted}`}>
          Calculated Quarterly
        </span>
      </div>

      <div className="h-60 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={fundHistory} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <XAxis
              dataKey="date"
              stroke={kamiTheme.stoneHex}
              tick={{ fill: kamiTheme.stoneHex, fontSize: 11, fontFamily: 'sans-serif' }}
              axisLine={{ stroke: kamiTheme.warmSandHex }}
            />
            <YAxis
              stroke={kamiTheme.stoneHex}
              tick={{ fill: kamiTheme.stoneHex, fontSize: 11, fontFamily: 'sans-serif' }}
              axisLine={{ stroke: kamiTheme.warmSandHex }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FAF9F5',
                borderColor: '#E8E6DC',
                borderRadius: '0.375rem',
                color: '#141413',
                fontFamily: 'serif',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                fontSize: '12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={kamiTheme.inkHex}
              strokeWidth={2}
              dot={{ fill: '#FAF9F5', stroke: kamiTheme.inkHex, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
