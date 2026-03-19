import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Tag, 
  Search, 
  X,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface TagItem {
  id: string;
  name: string;
  color: string;
  usageCount: number;
}

const INITIAL_TAGS: TagItem[] = [
  { id: '1', name: 'Urgent', color: 'bg-rose-500', usageCount: 124 },
  { id: '2', name: 'Billing', color: 'bg-blue-500', usageCount: 89 },
  { id: '3', name: 'Technical', color: 'bg-amber-500', usageCount: 56 },
  { id: '4', name: 'Feedback', color: 'bg-emerald-500', usageCount: 34 },
  { id: '5', name: 'Onboarding', color: 'bg-indigo-500', usageCount: 21 },
];

export const TagsView: React.FC = () => {
  const { t } = useTranslation();
  const [tags, setTags] = useState<TagItem[]>(INITIAL_TAGS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('tags.title')}</h1>
          <p className="text-slate-500 text-sm">Manage tags to categorize and filter your cases and clients.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {t('tags.add')}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tags.map((tag) => (
            <motion.div 
              key={tag.id}
              layout
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-300 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${tag.color} shadow-sm`} />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{tag.name}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tag.usageCount} uses</span>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
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
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900">{t('tags.add')}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tag Name</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="e.g. Urgent" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('tags.color')}</label>
                  <div className="flex flex-wrap gap-2">
                    {['bg-rose-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-indigo-500', 'bg-purple-500', 'bg-cyan-500', 'bg-slate-500'].map(color => (
                      <button key={color} className={`w-8 h-8 rounded-full ${color} border-2 border-transparent hover:border-white hover:ring-2 hover:ring-slate-300 transition-all`} />
                    ))}
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

export default TagsView;
