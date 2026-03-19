import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Inbox, 
  BarChart3, 
  Settings, 
  LogOut,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../utils';
import { useTranslation } from '../i18n';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { t } = useTranslation();

  const navItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'portfolio', label: t('nav.portfolio'), icon: Briefcase },
    { id: 'inbox', label: t('nav.inbox'), icon: Inbox },
    { id: 'analytics', label: t('nav.analytics'), icon: BarChart3 },
    { id: 'settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">Sada</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{t('nav.enterprise_suite')}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">SADA CX Ops</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold">{t('nav.verified_admin')}</p>
            </div>
          </div>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-500 hover:text-slate-900 transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>{t('nav.help')}</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-500 hover:text-red-600 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>{t('nav.logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
