import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { kamiTheme } from '../../constants/theme';
import { FundHistoryItem } from '../../data/mockData';

interface ValuationChartProps {
  fundHistory: FundHistoryItem[];
}

export default function ValuationChart({ fundHistory }: ValuationChartProps) {
  return (
    <div className={`lg:col-span-2 ${kamiTheme.cardBg} p-8 rounded-lg border ${kamiTheme.cardBorder}`}>
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="text-xl font-normal">Fund Valuation Curve</h2>
        <span className={`text-xs font-sans ${kamiTheme.textMuted}`}>Calculated Quarterly</span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={fundHistory}>
            <XAxis
              dataKey="date"
              stroke={kamiTheme.stoneHex}
              tick={{ fill: kamiTheme.stoneHex, fontSize: 12, fontFamily: 'sans-serif' }}
              axisLine={{ stroke: kamiTheme.warmSandHex }}
            />
            <YAxis
              stroke={kamiTheme.stoneHex}
              tick={{ fill: kamiTheme.stoneHex, fontSize: 12, fontFamily: 'sans-serif' }}
              axisLine={{ stroke: kamiTheme.warmSandHex }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FAF9F5',
                borderColor: '#E8E6DC',
                borderRadius: '0.375rem',
                color: '#141413',
                fontFamily: 'serif',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={kamiTheme.inkHex}
              strokeWidth={2}
              dot={{ fill: '#FAF9F5', stroke: kamiTheme.inkHex, strokeWidth: 2, r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
