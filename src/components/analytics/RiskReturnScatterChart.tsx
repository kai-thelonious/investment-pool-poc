import { ShieldAlert } from 'lucide-react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ZAxis,
  Cell,
} from 'recharts';
import { kamiTheme } from '../../constants/theme';
import { RiskReturnItem } from '../../data/mockData';

interface RiskReturnScatterChartProps {
  items: RiskReturnItem[];
}

export default function RiskReturnScatterChart({ items }: RiskReturnScatterChartProps) {
  return (
    <div className={`${kamiTheme.cardBg} p-5 sm:p-8 rounded-xl border ${kamiTheme.cardBorder}`}>
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-normal text-[#141413] flex items-center gap-2">
          <ShieldAlert className="text-[#1B365D]" size={18} /> Risk vs. Yield Matrix
        </h2>
        <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-0.5`}>
          Evaluating portfolio holdings by Volatility Index (1-10) vs. Projected Yield (%).
        </p>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <XAxis
              type="number"
              dataKey="riskScore"
              name="Risk Index"
              domain={[0, 10]}
              unit="/10"
              stroke={kamiTheme.stoneHex}
              tick={{ fill: kamiTheme.stoneHex, fontSize: 11, fontFamily: 'sans-serif' }}
              axisLine={{ stroke: kamiTheme.warmSandHex }}
            />
            <YAxis
              type="number"
              dataKey="expectedYield"
              name="Expected Yield"
              unit="%"
              stroke={kamiTheme.stoneHex}
              tick={{ fill: kamiTheme.stoneHex, fontSize: 11, fontFamily: 'sans-serif' }}
              axisLine={{ stroke: kamiTheme.warmSandHex }}
            />
            <ZAxis type="number" dataKey="allocation" range={[100, 400]} name="Allocation" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ payload }) => {
                if (payload && payload.length) {
                  const data = payload[0].payload as RiskReturnItem;
                  return (
                    <div className="bg-[#FAF9F5] p-3 rounded-lg border border-[#E8E6DC] shadow-md font-sans text-xs space-y-1">
                      <p className="font-serif font-bold text-[#141413]">{data.name}</p>
                      <p className="text-[#504E49]">
                        Risk Rating:{' '}
                        <span className="font-semibold text-[#1B365D]">{data.riskScore} / 10</span>
                      </p>
                      <p className="text-[#504E49]">
                        Target Return:{' '}
                        <span className="font-semibold text-emerald-700">
                          {data.expectedYield}%
                        </span>
                      </p>
                      <p className="text-[#504E49]">
                        Allocation:{' '}
                        <span className="font-semibold text-[#141413]">
                          ${data.allocation.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="Holdings" data={items}>
              {items.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={kamiTheme.piePalette[index % kamiTheme.piePalette.length]}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E8E6DC]/60 flex items-center justify-between text-[11px] font-sans text-[#6B6A64]">
        <span>Low Risk & Low Volatility (1.0)</span>
        <span>High Growth & High Volatility (10.0)</span>
      </div>
    </div>
  );
}
