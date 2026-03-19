import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Layers, 
  Users, 
  ArrowUpCircle, 
  X,
  Save,
  Settings
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface Queue {
  id: string;
  name: string;
  priority: number;
  strategy: 'round-robin' | 'least-busy' | 'random';
  agentsCount: number;
  active: boolean;
}

const INITIAL_QUEUES: Queue[] = [
  { id: '1', name: 'General Support', priority: 1, strategy: 'round-robin', agentsCount: 12, active: true },
  { id: '2', name: 'VIP Clients', priority: 10, strategy: 'least-busy', agentsCount: 4, active: true },
  { id: '3', name: 'Technical Billing', priority: 5, strategy: 'round-robin', agentsCount: 8, active: true },
];

export const QueuesView: React.FC = () => {
  const { t } = useTranslation();
  const [queues, setQueues] = useState<Queue[]>(INITIAL_QUEUES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('queues.title')}</h1>
          <p className="text-slate-500 text-sm">Configure how incoming tasks are distributed among your teams.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {t('queues.add')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {queues.map((queue) => (
          <motion.div 
            key={queue.id}
            layout
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{queue.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <Settings className="w-3 h-3" />
                    {queue.strategy}
                  </div>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center">
                <ArrowUpCircle className="w-4 h-4 text-amber-500 mb-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('queues.priority')}</span>
                <span className="text-lg font-bold text-slate-700">{queue.priority}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center">
                <Users className="w-4 h-4 text-blue-500 mb-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agents</span>
                <span className="text-lg font-bold text-slate-700">{queue.agentsCount}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-slate-500">Live & Active</span>
              </div>
              <button className="text-xs font-bold text-blue-600 hover:underline">Manage Agents</button>
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
                <h3 className="text-lg font-bold text-slate-900">{t('queues.add')}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Queue Name</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="e.g. Sales Support" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('queues.strategy')}</label>
                    <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                      <option value="round-robin">Round Robin</option>
                      <option value="least-busy">Least Busy</option>
                      <option value="random">Random</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('queues.priority')}</label>
                    <input type="number" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" defaultValue={1} />
                  </div>
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

export default QueuesView;
