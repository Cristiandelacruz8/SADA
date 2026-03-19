import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  FileText, 
  Mail, 
  MessageSquare, 
  X,
  Save
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface Template {
  id: string;
  name: string;
  type: 'email' | 'whatsapp' | 'sms';
  subject?: string;
  content: string;
  category: string;
}

const INITIAL_TEMPLATES: Template[] = [
  { id: '1', name: 'Welcome Email', type: 'email', subject: 'Welcome to SADA', content: 'Hello {{name}}, welcome to our platform...', category: 'Onboarding' },
  { id: '2', name: 'Case Resolved', type: 'whatsapp', content: 'Your case {{caseId}} has been resolved.', category: 'Support' },
  { id: '3', name: 'Appointment Reminder', type: 'sms', content: 'Reminder: You have an appointment tomorrow at {{time}}.', category: 'Scheduling' },
];

export const TemplatesView: React.FC = () => {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<Template[]>(INITIAL_TEMPLATES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      case 'sms': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('templates.title')}</h1>
          <p className="text-slate-500 text-sm">Manage your communication templates across all channels.</p>
        </div>
        <button 
          onClick={() => { setEditingTemplate(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {t('templates.add')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div 
            key={template.id}
            layout
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  template.type === 'email' ? 'bg-blue-50 text-blue-600' :
                  template.type === 'whatsapp' ? 'bg-emerald-50 text-emerald-600' :
                  'bg-amber-50 text-amber-600'
                }`}>
                  {getTypeIcon(template.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{template.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{template.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-4">
              {template.subject && (
                <p className="text-xs font-bold text-slate-400 mb-1 truncate">
                  {t('templates.subject')}: <span className="text-slate-600">{template.subject}</span>
                </p>
              )}
              <p className="text-sm text-slate-600 line-clamp-3 italic">
                "{template.content}"
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>{template.type}</span>
              <span className="text-blue-500 cursor-pointer hover:underline">Preview</span>
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
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900">{t('templates.add')}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('templates.name')}</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Template name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('templates.type')}</label>
                    <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                      <option value="email">Email</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('templates.subject')}</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Email subject (optional)" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('templates.content')}</label>
                  <textarea rows={6} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono" placeholder="Write your template content here... Use {{variable}} for dynamic data."></textarea>
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

export default TemplatesView;
