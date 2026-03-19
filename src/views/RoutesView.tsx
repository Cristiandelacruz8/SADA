import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  GitBranch, 
  ArrowRight, 
  Filter, 
  X,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface RouteRule {
  id: string;
  name: string;
  condition: string;
  destination: string;
  priority: number;
  active: boolean;
}

const INITIAL_RULES: RouteRule[] = [
  { id: '1', name: 'VIP Routing', condition: 'client_tier == "VIP"', destination: 'VIP Queue', priority: 1, active: true },
  { id: '2', name: 'Technical Issues', condition: 'category == "Technical"', destination: 'Tech Support', priority: 5, active: true },
  { id: '3', name: 'Billing Inquiries', condition: 'subject contains "billing"', destination: 'Billing Queue', priority: 10, active: true },
];

export const RoutesView: React.FC = () => {
  const { t } = useTranslation();
  const [rules, setRules] = useState<RouteRule[]>(INITIAL_RULES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('routes.title')}</h1>
          <p className="text-slate-500 text-sm">Establish intelligent routing rules to direct cases to the right teams.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {t('routes.add')}
        </button>
      </div>

      <div className="space-y-4">
        {rules.map((rule, index) => (
          <motion.div 
            key={rule.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <GitBranch className="w-6 h-6" />
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{rule.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${rule.active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Priority {rule.priority}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <code className="text-xs font-mono text-indigo-600 font-bold">{rule.condition}</code>
                </div>

                <div className="flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                  <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {rule.destination}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Placeholder */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900">{t('routes.add')}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rule Name</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="e.g. High Priority Filter" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('routes.condition')}</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono" placeholder="e.g. client_tier == 'VIP'" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('routes.destination')}</label>
                  <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    <option value="VIP Queue">VIP Queue</option>
                    <option value="Tech Support">Tech Support</option>
                    <option value="General Support">General Support</option>
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600">{t('crm.cancel')}</button>
                <button className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg flex items-center gap-2"><Save className="w-4 h-4" /> {t('crm.save')}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoutesView;
