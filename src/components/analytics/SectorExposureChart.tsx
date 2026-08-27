import { BarChart as BarChartIcon } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { kamiTheme } from '../../constants/theme';
import { SectorExposureItem } from '../../data/mockData';

interface SectorExposureChartProps {
  sectors: SectorExposureItem[];
}

export default function SectorExposureChart({ sectors }: SectorExposureChartProps) {
  const totalAllocation = sectors.reduce((sum, s) => sum + s.allocation, 0);

  return (
    <div className={`${kamiTheme.cardBg} p-5 sm:p-8 rounded-xl border ${kamiTheme.cardBorder}`}>
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-normal text-[#141413] flex items-center gap-2">
            <BarChartIcon className="text-[#1B365D]" size={18} /> Sector Exposure
          </h2>
          <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-0.5`}>
            Capital distribution by target industry sector.
          </p>
        </div>
        <span className="text-[11px] sm:text-xs font-sans font-semibold text-[#1B365D] bg-[#E4ECF5] px-2.5 py-1 rounded border border-[#1B365D]/20 self-start sm:self-auto">
          Total: ${totalAllocation.toLocaleString()}
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sectors}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              type="number"
              stroke={kamiTheme.stoneHex}
              tick={{ fill: kamiTheme.stoneHex, fontSize: 11, fontFamily: 'sans-serif' }}
              axisLine={{ stroke: kamiTheme.warmSandHex }}
            />
            <YAxis
              type="category"
              dataKey="sector"
              width={140}
              stroke={kamiTheme.stoneHex}
              tick={{ fill: '#141413', fontSize: 11, fontFamily: 'sans-serif', fontWeight: 500 }}
              axisLine={{ stroke: kamiTheme.warmSandHex }}
            />
            <Tooltip
              formatter={(val) => [`$${Number(val || 0).toLocaleString()}`, 'Allocation']}
              contentStyle={{
                backgroundColor: '#FAF9F5',
                borderColor: '#E8E6DC',
                borderRadius: '0.375rem',
                fontSize: '12px',
                fontFamily: 'serif',
              }}
            />
            <Bar dataKey="allocation" radius={[0, 4, 4, 0]}>
              {sectors.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || kamiTheme.piePalette[index % kamiTheme.piePalette.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 pt-4 border-t border-[#E8E6DC]/60 font-sans text-xs">
        {sectors.map((s) => {
          const pct = totalAllocation > 0 ? ((s.allocation / totalAllocation) * 100).toFixed(1) : 0;
          return (
            <div
              key={s.sector}
              className="flex items-center justify-between p-2 rounded bg-[#FAF9F5] border border-[#E8E6DC]"
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: s.color }}
                ></span>
                <span className="text-[#141413] truncate font-medium">{s.sector}</span>
              </div>
              <span className="font-semibold text-[#1B365D] shrink-0 ml-2">
                ${s.allocation.toLocaleString()} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
