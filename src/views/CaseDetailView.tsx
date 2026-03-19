import React from 'react';
import { MOCK_CASES, MOCK_INTERACTIONS } from '../data';
import { 
  Calendar, 
  MessageSquare, 
  ShieldAlert, 
  XCircle, 
  History, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Clock,
  User,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { cn } from '../utils';
import { useTranslation } from '../i18n';

interface CaseDetailViewProps {
  caseId: string;
  onBack: () => void;
}

export function CaseDetailView({ caseId, onBack }: CaseDetailViewProps) {
  const { t } = useTranslation();
  const caseData = MOCK_CASES.find(c => c.id === caseId) || MOCK_CASES[0];

  return (
    <div className="p-8 space-y-8">
      {/* Case Header Card */}
      <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-slate-900">{caseData.id}</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">{t('cd.active_recovery')}</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              {t('cd.client')}: <span className="text-slate-900 font-bold">{caseData.clientName}</span> • <span className="text-blue-600 font-bold">{t(`data.${caseData.tier.toLowerCase().replace(/ /g, '_')}`) || caseData.tier}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-12">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{t('cd.current_exposure')}</p>
            <p className="text-3xl font-bold text-slate-900">${caseData.exposure.toLocaleString()}.00</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{t('cd.sla_countdown')}</p>
            <div className="flex items-center gap-2 text-red-600">
              <Clock className="w-6 h-6" />
              <p className="text-3xl font-bold tracking-tighter">{caseData.slaCountdown}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-4">
        <button className="flex items-center justify-center gap-3 py-6 bg-blue-600 text-white rounded-[24px] font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
          <Calendar className="w-5 h-5" />
          {t('cd.schedule_payment')}
        </button>
        <button className="flex items-center justify-center gap-3 py-6 bg-slate-100 text-slate-700 rounded-[24px] font-bold hover:bg-slate-200 transition-all">
          <MessageSquare className="w-5 h-5" />
          {t('cd.send_sms')}
        </button>
        <button className="flex items-center justify-center gap-3 py-6 bg-slate-100 text-slate-700 rounded-[24px] font-bold hover:bg-slate-200 transition-all">
          <ShieldAlert className="w-5 h-5" />
          {t('cd.escalate_legal')}
        </button>
        <button className="flex items-center justify-center gap-3 py-6 bg-slate-100 text-slate-700 rounded-[24px] font-bold hover:bg-slate-200 transition-all">
          <XCircle className="w-5 h-5" />
          {t('cd.close_case')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">{t('cd.lifecycle')}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 bg-slate-50 rounded-full text-[10px] font-bold text-slate-600 border border-slate-200">{t('cd.all_activity')}</button>
              <button className="p-1.5 text-slate-400 hover:text-slate-900"><MoreVertical className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="relative space-y-12 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {MOCK_INTERACTIONS.map((interaction, idx) => (
              <div key={interaction.id} className="relative pl-12">
                <div className={cn(
                  "absolute left-0 top-1.5 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10",
                  idx === 0 ? "bg-blue-600" : idx === 1 ? "bg-emerald-500" : "bg-slate-300"
                )}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-slate-900">{interaction.type}</h4>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{interaction.timestamp.split(' ').slice(0, 2).join(' ')}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{interaction.timestamp.split(' ').slice(2).join(' ')}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                  {interaction.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
              <input 
                type="text" 
                placeholder={t('cd.note_placeholder')}
                className="bg-transparent border-none text-sm outline-none flex-1"
              />
              <button className="text-blue-600 text-sm font-bold hover:text-blue-700">{t('cd.post_note')}</button>
            </div>
          </div>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[32px] p-8 text-white">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{t('cd.portfolio_health')}</h4>
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-5xl font-bold tracking-tighter">84.2</h3>
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +2.4%
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-8">
              {t('cd.benchmark')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">{t('cd.avg_pay_cycle')}</p>
                <p className="text-lg font-bold">14 {t('cd.days')}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">{t('cd.risk_profile')}</p>
                <p className="text-lg font-bold text-blue-400">{t('cd.moderate')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{t('cd.ai_advisor')}</h3>
            </div>

            <div className="space-y-6">
              <div className="relative pl-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-600 before:rounded-full">
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mb-2">{t('cd.recommended_action')}</p>
                <h4 className="text-sm font-bold text-slate-900 mb-2">{t('cd.offer_deferral')}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {t('cd.deferral_desc')}
                </p>
                <button className="flex items-center gap-2 text-blue-600 text-xs font-bold hover:gap-3 transition-all">
                  {t('cd.generate_proposal')}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">{t('cd.secondary_action')}</p>
                <h4 className="text-sm font-bold text-slate-900 mb-2">{t('cd.sync_manager')}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('cd.sync_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
