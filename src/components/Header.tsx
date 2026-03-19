import React from 'react';
import { Search, Bell, HelpCircle, Grid, Globe } from 'lucide-react';
import { useTranslation, Language } from '../i18n';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { t, language, setLanguage } = useTranslation();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder={t('header.search')}
            className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
          />
        </div>
        
        <nav className="flex items-center gap-6">
          <button className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">{t('nav.portfolio')}</button>
          <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 py-5">{t('nav.inbox')}</button>
          <button className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">{t('header.global_ops')}</button>
        </nav>
      </div>

      <div className="flex items-center gap-4 ml-8">
        <div className="flex items-center gap-2 mr-4">
          <Globe className="w-4 h-4 text-slate-400" />
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="text-sm font-medium text-slate-600 bg-transparent border-none focus:ring-0 cursor-pointer outline-none"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.label}
              </option>
            ))}
          </select>
        </div>

        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
          <Grid className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-slate-200 mx-2"></div>
        <button className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
          <img src="https://picsum.photos/seed/admin/100/100" alt="User" className="w-full h-full object-cover" />
        </button>
      </div>
    </header>
  );
}
