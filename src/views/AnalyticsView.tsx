import React from 'react';
import { MOCK_TEAM } from '../data';
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  ChevronRight,
  Zap,
  Target
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../utils';
import { useTranslation } from '../i18n';

const CHART_DATA = [
  { name: 'Mon', value: 30 },
  { name: 'Tue', value: 45 },
  { name: 'Wed', value: 35 },
  { name: 'Thu', value: 60 },
  { name: 'Fri', value: 40 },
  { name: 'Sat', value: 55 },
  { name: 'Sun', value: 70 },
];

export function AnalyticsView() {
  const { t } = useTranslation();
  return (
    <div className="p-8 space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[32px] p-8 border-l-4 border-l-blue-600 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold">
              <TrendingUp className="w-4 h-4" />
              +12%
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{t('an.tasks_completed')}</p>
          <h3 className="text-4xl font-bold text-slate-900">1,240</h3>
          <p className="text-xs text-slate-400 mt-2">{t('an.this_month')} • <span className="text-emerald-600 font-bold">+12% {t('an.vs_last_month')}</span></p>
        </div>

        <div className="bg-white rounded-[32px] p-8 border-l-4 border-l-emerald-500 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold">
              <Zap className="w-4 h-4" />
              {t('an.steady')}
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{t('an.avg_response')}</p>
          <h3 className="text-4xl font-bold text-slate-900">4.2m</h3>
          <p className="text-xs text-slate-400 mt-2">{t('an.below_target')} 5.0m</p>
        </div>

        <div className="bg-white rounded-[32px] p-8 border-l-4 border-l-slate-900 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <Target className="w-6 h-6 text-slate-900" />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{t('an.team_efficiency')}</p>
          <h3 className="text-4xl font-bold text-slate-900">94%</h3>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-blue-600 w-[94%]"></div>
          </div>
        </div>
      </div>

      {/* Team Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {MOCK_TEAM.map((member) => (
          <div key={member.id} className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                  member.status === 'online' ? "bg-emerald-500" : "bg-slate-300"
                )}></div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">
                  {member.role === 'SENIOR AGENT' ? t('data.senior_agent') :
                   member.role === 'PORTFOLIO MANAGER' ? t('data.portfolio_manager') : member.role}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">{t('an.resolved')}</p>
                <p className="text-lg font-bold text-slate-900">{member.resolved}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">{t('an.rating')}</p>
                <p className="text-lg font-bold text-slate-900">{member.rating}/5</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">{t('an.sla')}</p>
                <p className="text-lg font-bold text-slate-900">{member.sla}%</p>
              </div>
            </div>

            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">{t('an.top_performer')}</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full">{t('an.fast_responder')}</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-[10px] text-slate-500 font-bold uppercase">{t('an.monthly_goal')}</p>
                <p className="text-xs font-bold text-slate-900">{member.goalProgress}%</p>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: `${member.goalProgress}%` }}></div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">{t('an.active_focus')}</p>
              <div className="space-y-3">
                {member.focus.map((f, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-700">{f.name}</p>
                    <div className={cn("w-2 h-2 rounded-full", f.color)}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Throughput Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{t('an.throughput')}</h3>
            <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
              <button className="px-4 py-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-900">{t('an.daily')}</button>
              <button className="px-4 py-1.5 text-[10px] font-bold bg-blue-600 text-white rounded-lg shadow-sm">{t('an.weekly')}</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[32px] p-8 text-white flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{t('an.portfolio_health')}</h4>
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-5xl font-bold tracking-tighter">98.2%</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-8">
              {t('an.health_message')}
            </p>
          </div>
          
          <div className="space-y-4">
            <button className="w-full py-4 bg-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all border border-white/10">
              {t('an.view_details')}
            </button>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
