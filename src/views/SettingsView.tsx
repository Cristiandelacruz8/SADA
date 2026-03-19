import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Database, 
  FileText, 
  Clock, 
  Layers, 
  GitBranch, 
  Tag,
  ChevronRight,
  Settings as SettingsIcon
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface SettingsViewProps {
  onNavigate: (tab: string) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      id: 'agents',
      title: t('settings.agents'),
      description: t('settings.agents_desc'),
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      id: 'crm',
      title: t('settings.crm'),
      description: t('settings.crm_desc'),
      icon: Database,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      id: 'templates',
      title: t('settings.templates'),
      description: t('settings.templates_desc'),
      icon: FileText,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      id: 'schedules',
      title: t('settings.schedules'),
      description: t('settings.schedules_desc'),
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      id: 'queues',
      title: t('settings.queues'),
      description: t('settings.queues_desc'),
      icon: Layers,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
    {
      id: 'routes',
      title: t('settings.routes'),
      description: t('settings.routes_desc'),
      icon: GitBranch,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      id: 'tags',
      title: t('settings.tags'),
      description: t('settings.tags_desc'),
      icon: Tag,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-slate-100 rounded-lg">
            <SettingsIcon className="w-6 h-6 text-slate-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {t('settings.title')}
          </h1>
        </div>
        <p className="text-slate-500 text-lg max-w-2xl">
          {t('settings.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col text-left p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-1 flex items-center justify-between">
                {item.title}
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
          <SettingsIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h4 className="text-slate-900 font-medium mb-1">Advanced System Tools</h4>
        <p className="text-slate-500 text-sm max-w-md">
          Access logs, API configurations, and system health monitoring tools from the enterprise admin console.
        </p>
      </div>
    </div>
  );
};

export default SettingsView;
