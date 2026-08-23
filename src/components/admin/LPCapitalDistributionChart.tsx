import { Users as UsersIcon } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { kamiTheme } from '../../constants/theme';
import { UserItem } from '../../data/mockData';

interface LPCapitalDistributionChartProps {
  users: UserItem[];
}

export default function LPCapitalDistributionChart({ users }: LPCapitalDistributionChartProps) {
  const totalDeposited = users.reduce((sum, u) => sum + u.deposited, 0);

  const chartData = users.map(u => ({
    name: u.name,
    deposited: u.deposited,
    pending: u.pending,
    sharePercent: totalDeposited > 0 ? ((u.deposited / totalDeposited) * 100).toFixed(1) : '0',
  }));

  return (
    <div className={`${kamiTheme.cardBg} p-5 sm:p-8 rounded-xl border ${kamiTheme.cardBorder}`}>
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-normal text-[#141413] flex items-center gap-2">
            <UsersIcon className="text-[#1B365D]" size={18} /> LP Capital & Ownership Share
          </h2>
          <p className={`text-[11px] sm:text-xs font-sans ${kamiTheme.textSub} mt-0.5`}>
            Paid-in capital contributions and pro-rata pool ownership across Limited Partners.
          </p>
        </div>
        <span className="text-[11px] sm:text-xs font-sans font-semibold text-[#1B365D] bg-[#E4ECF5] px-2.5 py-1 rounded border border-[#1B365D]/20 self-start sm:self-auto">
          Total LP Capital: ${totalDeposited.toLocaleString()}
        </span>
      </div>

      <div className="h-60 sm:h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <XAxis
              dataKey="name"
              stroke={kamiTheme.stoneHex}
              tick={{ fill: '#141413', fontSize: 11, fontFamily: 'sans-serif', fontWeight: 500 }}
              axisLine={{ stroke: kamiTheme.warmSandHex }}
            />
            <YAxis
              stroke={kamiTheme.stoneHex}
              tick={{ fill: kamiTheme.stoneHex, fontSize: 11, fontFamily: 'sans-serif' }}
              axisLine={{ stroke: kamiTheme.warmSandHex }}
              tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-[#FAF9F5] p-3 rounded-lg border border-[#E8E6DC] shadow-md font-sans text-xs space-y-1">
                      <p className="font-serif font-bold text-[#141413]">{data.name}</p>
                      <p className="text-[#504E49]">Paid-In Capital: <span className="font-semibold text-[#1B365D]">${data.deposited.toLocaleString()}</span></p>
                      <p className="text-[#504E49]">Pending Commitment: <span className="font-semibold text-amber-700">${data.pending.toLocaleString()}</span></p>
                      <p className="text-[#504E49]">Pool Ownership Share: <span className="font-bold text-[#141413]">{data.sharePercent}%</span></p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="deposited" radius={[4, 4, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={kamiTheme.piePalette[index % kamiTheme.piePalette.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#E8E6DC]/60 font-sans text-xs">
        {chartData.map((user, index) => (
          <div key={user.name} className="flex items-center justify-between p-2 rounded bg-[#FAF9F5] border border-[#E8E6DC]">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: kamiTheme.piePalette[index % kamiTheme.piePalette.length] }}></span>
              <span className="text-[#141413] truncate font-medium">{user.name}</span>
            </div>
            <span className="font-semibold text-[#1B365D] shrink-0 ml-2">
              {user.sharePercent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
