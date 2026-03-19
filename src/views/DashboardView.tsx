import React from 'react';
import { 
  BarChart3, 
  Users, 
  Clock, 
  CheckCircle2, 
  Calendar,
  MessageSquare,
  TrendingUp,
  Zap,
  ChevronRight
} from 'lucide-react';
import { cn } from '../utils';
import { useTranslation } from '../i18n';

export function DashboardView() {
  const { t } = useTranslation();

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t('db.title')}</h2>
          <p className="text-slate-500 font-medium">{t('db.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <Calendar className="w-4 h-4" />
            {t('db.date')}
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            <Zap className="w-4 h-4" />
            {t('db.quick_action')}
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t('db.active_cases'), value: '1,284', change: '+12%', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: t('db.avg_resolution'), value: '4.2d', change: '-2.4d', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: t('db.team_capacity'), value: '94%', change: 'Optimal', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: t('db.sla_compliance'), value: '98.2%', change: '+0.4%', icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", kpi.bg)}>
                <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              </div>
              <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full", 
                kpi.change.includes('+') || kpi.change === 'Optimal' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
              )}>
                {kpi.change}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">{t('db.priority_feed')}</h3>
              <button className="text-blue-600 text-xs font-bold hover:underline">{t('db.view_all')}</button>
            </div>
            <div className="divide-y divide-slate-50">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="p-6 flex items-center gap-4 hover:bg-slate-50 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition-all">
                    <MessageSquare className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-slate-900">{t('db.new_message')}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">{t('db.time_ago')}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{t('db.message_preview')}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">{t('db.omnichannel')}</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-md">{t('db.connect_channels')}</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">
                {t('db.configure_channels')}
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">{t('db.workload_balance')}</h3>
            <div className="space-y-6">
              {[
                { label: t('db.customer_service'), value: 85, color: 'bg-blue-600' },
                { label: t('db.collections'), value: 62, color: 'bg-orange-500' },
                { label: t('db.operations'), value: 45, color: 'bg-emerald-500' },
                { label: t('db.back_office'), value: 28, color: 'bg-indigo-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="text-slate-900">{item.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={cn("h-full", item.color)} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-[32px] p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6" />
              <h3 className="text-lg font-bold">{t('db.productivity_insight')}</h3>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed mb-6">
              {t('db.productivity_message')}
            </p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-all border border-white/20">
              {t('nav.analytics')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
