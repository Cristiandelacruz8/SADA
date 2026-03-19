import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Edit2, 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  ArrowUpDown,
  MoreVertical
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface Agent {
  id: string;
  username: string;
  name: string;
  email: string;
  createdAt: string;
  active: boolean;
  queue: string;
  roles: string[];
}

const MOCK_AGENTS: Agent[] = [
  { id: '1', username: 'es00677928', name: 'JUAN MIGUEL VALLEJO CABRERA', email: 'juan.vallejo@movistarproseguralarmas.com', createdAt: '22/07/2025 13:00', active: true, queue: 'Cola Inicial', roles: ['ROL_Agente'] },
  { id: '2', username: 'es02017491', name: 'KATYA MICHELLE CARRILLO DE LINARES', email: 'katya.carrillo@movistarproseguralarmas.com', createdAt: '22/07/2025 13:01', active: true, queue: 'Cola Inicial', roles: ['ROL_Agente'] },
  { id: '3', username: 'es00676393', name: 'SERGIO MARTIN COLAZO', email: 'sergio.martin@movistarproseguralarmas.com', createdAt: '22/07/2025 13:01', active: true, queue: 'Cola Inicial', roles: ['ROL_Agente'] },
  { id: '4', username: 'es02013670', name: 'JHON NICO BARRETO', email: 'jhon.barreto@movistarproseguralarmas.com', createdAt: '22/07/2025 13:02', active: true, queue: 'Cola Inicial', roles: ['ROL_Agente'] },
  { id: '5', username: 'es02010319', name: 'LAURA ROMERO NUÑEZ NUÑEZ', email: 'laura.romero-nunez@movistarproseguralarmas.com', createdAt: '22/07/2025 13:03', active: true, queue: 'Cola Inicial', roles: ['ROL_Agente'] },
  { id: '6', username: 'es00615422', name: 'RAUL ESTEBAN DIAZ', email: 'raul.esteban@movistarproseguralarmas.com', createdAt: '22/07/2025 13:04', active: true, queue: 'Cola Inicial', roles: ['ROL_Agente'] },
  { id: '7', username: 'es00689543', name: 'LUCIA ZARAGÜETA GONZALEZ', email: 'lucia.zaragueta@movistarproseguralarmas.com', createdAt: '22/07/2025 13:06', active: true, queue: 'Cola Inicial', roles: ['ROL_Supervisor'] },
  { id: '8', username: 'es00689692', name: 'LAURA SANTIAGO PEINADO', email: 'laura.santiago-peinado@movistarproseguralarmas.com', createdAt: '22/07/2025 13:05', active: true, queue: 'Cola Inicial', roles: ['ROL_Supervisor'] },
  { id: '9', username: 'es00613268', name: 'JAVIER GALÁN', email: 'javier.galan@prosegur.com', createdAt: '22/07/2025 13:06', active: true, queue: 'Cola Inicial', roles: ['ROL_Supervisor'] },
  { id: '10', username: 'es00420569', name: 'REBECA ENRIQUEZ', email: 'rebeca.enriquez@movistarproseguralarmas.com', createdAt: '22/07/2025 13:08', active: true, queue: 'Cola Inicial', roles: ['ROL_Supervisor'] },
];

export const AgentsView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('agents.title')}</h1>
          <p className="text-slate-500 text-sm">Manage and monitor your service agents.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
            <UserPlus className="w-4 h-4" />
            {t('agents.create')}
          </button>
          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-bottom border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-700">Filters</span>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('agents.username')}</label>
            <div className="relative">
              <input type="text" className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Search username..." />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('agents.name')}</label>
            <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Full name..." />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('agents.email')}</label>
            <input type="email" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Email address..." />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('agents.queue')}</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none">
              <option value="">All Queues</option>
              <option value="initial">Cola Inicial</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('agents.created_from')}</label>
            <input type="date" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('agents.created_to')}</label>
            <input type="date" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative inline-flex items-center">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{t('agents.active')}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 transition-colors">
                    {t('agents.username')}
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 transition-colors">
                    {t('agents.name')}
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 transition-colors">
                    {t('agents.email')}
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 transition-colors">
                    {t('agents.created_at')}
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">{t('agents.active')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('agents.queue')}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('agents.roles')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_AGENTS.map((agent) => (
                <tr key={agent.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Call">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600">{agent.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{agent.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{agent.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{agent.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input type="checkbox" checked={agent.active} readOnly className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{agent.queue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {agent.roles.map((role) => (
                        <span key={role} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            {t('agents.showing')} <span className="font-medium text-slate-900">1</span> {t('agents.of')} <span className="font-medium text-slate-900">10</span> / {t('agents.total')}: <span className="font-medium text-slate-900">24</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all disabled:opacity-50">
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center px-1">
              <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg text-sm font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-all">2</button>
              <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-all">3</button>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all">
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsView;
