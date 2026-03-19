import React from 'react';
import { MOCK_CASES } from '../data';
import { Search, Filter, ChevronRight, MoreHorizontal, ArrowUpRight, Clock, TrendingUp, CheckCircle2, AlertCircle, ChevronLeft, Mail } from 'lucide-react';
import { cn } from '../utils';
import { useTranslation } from '../i18n';

interface PortfolioViewProps {
  onCaseClick: (id: string) => void;
}

export function PortfolioView({ onCaseClick }: PortfolioViewProps) {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = React.useState<string>('ALL');
  const [riskFilter, setRiskFilter] = React.useState<string>('ALL');
  const [tierFilter, setTierFilter] = React.useState<string>('ALL');
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 10;

  const filteredCases = React.useMemo(() => {
    return MOCK_CASES.filter(item => {
      const statusMatch = statusFilter === 'ALL' || item.status === statusFilter;
      const riskMatch = riskFilter === 'ALL' || item.riskProfile === riskFilter;
      const tierMatch = tierFilter === 'ALL' || item.tier.includes(tierFilter);
      return statusMatch && riskMatch && tierMatch;
    });
  }, [statusFilter, riskFilter, tierFilter]);

  const totalPages = Math.ceil(filteredCases.length / pageSize);
  const paginatedCases = filteredCases.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, riskFilter, tierFilter]);

  return (
    <div className="p-8 space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t('pf.authority')}</p>
            <div className="flex items-baseline gap-4 mb-1">
              <h3 className="text-5xl font-bold tracking-tighter">{t('pf.title')}</h3>
              <span className="text-4xl font-light text-slate-400">{filteredCases.length}</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">{t('pf.total_assets')}</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-blue-600/30 transition-all duration-500"></div>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-bold text-emerald-600">+12%</span>
          </div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{t('pf.active_portfolios')}</p>
          <h3 className="text-4xl font-bold text-slate-900">432</h3>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-sm font-bold text-red-600">-2.4d</span>
          </div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{t('pf.avg_days')}</p>
          <h3 className="text-4xl font-bold text-slate-900">4.2 {t('pf.days')}</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[24px] p-4 border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">{t('pf.status')}:</span>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="ALL">{t('pf.all_status')}</option>
              <option value="OPEN">{t('pf.open')}</option>
              <option value="PENDING">{t('pf.pending')}</option>
              <option value="RESOLVED">{t('pf.resolved')}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">{t('pf.risk')}:</span>
            <select 
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="ALL">{t('pf.all_risk')}</option>
              <option value="Low">{t('pf.low')}</option>
              <option value="Moderate">{t('pf.moderate')}</option>
              <option value="High">{t('pf.high')}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">{t('pf.tier')}:</span>
            <select 
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="ALL">{t('pf.all_tiers')}</option>
              <option value="Tier 1">{t('pf.tier1')}</option>
              <option value="Standard">{t('pf.standard')}</option>
              <option value="New">{t('pf.new_acquisition')}</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setStatusFilter('ALL');
              setRiskFilter('ALL');
              setTierFilter('ALL');
            }}
            className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline"
          >
            {t('pf.reset')}
          </button>
          <div className="h-4 w-px bg-slate-200"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {filteredCases.length} {t('pf.results')}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('pf.client_name')}</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('pf.last_interaction')}</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('pf.value')}</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('pf.status')}</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">{t('pf.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCases.length > 0 ? paginatedCases.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => onCaseClick(item.id)}
                className="group hover:bg-slate-50 transition-all cursor-pointer border-b border-slate-50 last:border-none"
              >
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                      {item.clientName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.clientName}</p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {item.tier === 'Tier 1 Strategic' ? t('data.tier_strategic') :
                         item.tier === 'Standard Mid-Market' ? t('data.tier_midmarket') :
                         item.tier === 'New Acquisition' ? t('data.tier_new') : item.tier}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium">{item.lastInteraction}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div>
                    <p className="text-sm font-bold text-slate-900">${item.value.toLocaleString()}</p>
                    <p className={cn(
                      "text-[10px] font-bold",
                      item.growth.includes('+') ? "text-emerald-600" : item.growth === 'Stable' ? "text-slate-500" : "text-red-600"
                    )}>
                      {item.growth.includes('Growth') ? item.growth.replace('Growth', t('data.growth')) :
                       item.growth.includes('Decline') ? item.growth.replace('Decline', t('data.decline')) :
                       item.growth === 'Stable' ? t('data.stable') :
                       item.growth === 'At Risk' ? t('data.at_risk') : item.growth}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    item.status === 'OPEN' && "bg-blue-100 text-blue-700",
                    item.status === 'PENDING' && "bg-orange-100 text-orange-700",
                    item.status === 'RESOLVED' && "bg-slate-100 text-slate-600"
                  )}>
                    {item.status === 'OPEN' ? t('pf.open') :
                     item.status === 'PENDING' ? t('pf.pending') :
                     item.status === 'RESOLVED' ? t('pf.resolved') : item.status}
                  </span>
                </td>
                <td className="px-6 py-6 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Filter className="w-8 h-8 text-slate-200" />
                    <p className="text-sm font-medium text-slate-500">{t('pf.no_results')}</p>
                    <button 
                      onClick={() => {
                        setStatusFilter('ALL');
                        setRiskFilter('ALL');
                        setTierFilter('ALL');
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline mt-2"
                    >
                      {t('pf.clear_filters')}
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {filteredCases.length > 0 && (
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {t('pf.displaying')} {Math.min((currentPage - 1) * pageSize + 1, filteredCases.length)}-{Math.min(currentPage * pageSize, filteredCases.length)} {t('pf.of')} {filteredCases.length} {t('pf.results_pagination')}
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button 
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={cn(
                    "w-6 h-6 rounded-md text-[10px] font-bold transition-all",
                    currentPage === page 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "hover:bg-slate-200 text-slate-600"
                  )}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
