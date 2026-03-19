import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Clock, 
  Calendar, 
  Globe, 
  X,
  Save,
  Check
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface Schedule {
  id: string;
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
  timezone: string;
  active: boolean;
}

const INITIAL_SCHEDULES: Schedule[] = [
  { id: '1', name: 'Standard Business Hours', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], startTime: '09:00', endTime: '18:00', timezone: 'Europe/Madrid', active: true },
  { id: '2', name: 'Weekend Support', days: ['Sat', 'Sun'], startTime: '10:00', endTime: '14:00', timezone: 'Europe/Madrid', active: true },
  { id: '3', name: 'Late Shift', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], startTime: '18:00', endTime: '22:00', timezone: 'Europe/Madrid', active: false },
];

export const SchedulesView: React.FC = () => {
  const { t } = useTranslation();
  const [schedules, setSchedules] = useState<Schedule[]>(INITIAL_SCHEDULES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('schedules.title')}</h1>
          <p className="text-slate-500 text-sm">Define when your agents are available to handle cases.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {t('schedules.add')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schedules.map((schedule) => (
          <motion.div 
            key={schedule.id}
            layout
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${schedule.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{schedule.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <Globe className="w-3 h-3" />
                    {schedule.timezone}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${schedule.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {schedule.active ? 'Active' : 'Inactive'}
                </div>
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  <Calendar className="w-3 h-3" />
                  {t('schedules.days')}
                </div>
                <div className="flex flex-wrap gap-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <span key={day} className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${schedule.days.includes(day) ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  <Clock className="w-3 h-3" />
                  {t('schedules.hours')}
                </div>
                <div className="text-lg font-bold text-slate-700">
                  {schedule.startTime} - {schedule.endTime}
                </div>
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
                <h3 className="text-lg font-bold text-slate-900">{t('schedules.add')}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('templates.name')}</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Schedule name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Start Time</label>
                    <input type="time" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">End Time</label>
                    <input type="time" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('schedules.timezone')}</label>
                  <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    <option value="Europe/Madrid">Europe/Madrid (GMT+1)</option>
                    <option value="America/New_York">America/New_York (GMT-5)</option>
                    <option value="UTC">UTC (GMT+0)</option>
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

export default SchedulesView;
