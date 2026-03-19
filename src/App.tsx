import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { PortfolioView } from './views/PortfolioView';
import { InboxView } from './views/InboxView';
import { AnalyticsView } from './views/AnalyticsView';
import { CaseDetailView } from './views/CaseDetailView';
import SettingsView from './views/SettingsView';
import AgentsView from './views/AgentsView';
import CRMFieldsView from './views/CRMFieldsView';
import TemplatesView from './views/TemplatesView';
import SchedulesView from './views/SchedulesView';
import QueuesView from './views/QueuesView';
import RoutesView from './views/RoutesView';
import TagsView from './views/TagsView';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [selectedCaseId, setSelectedCaseId] = React.useState<string | null>(null);

  const handleCaseClick = (id: string) => {
    setSelectedCaseId(id);
    setActiveTab('case-detail');
  };

  const handleBackToPortfolio = () => {
    setSelectedCaseId(null);
    setActiveTab('portfolio');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'portfolio':
        return <PortfolioView onCaseClick={handleCaseClick} />;
      case 'inbox':
        return <InboxView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'case-detail':
        return selectedCaseId ? (
          <CaseDetailView caseId={selectedCaseId} onBack={handleBackToPortfolio} />
        ) : (
          <PortfolioView onCaseClick={handleCaseClick} />
        );
      case 'settings':
        return <SettingsView onNavigate={setActiveTab} />;
      case 'agents':
        return <AgentsView />;
      case 'crm':
        return <CRMFieldsView />;
      case 'templates':
        return <TemplatesView />;
      case 'schedules':
        return <SchedulesView />;
      case 'queues':
        return <QueuesView />;
      case 'routes':
        return <RoutesView />;
      case 'tags':
        return <TagsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab === 'case-detail' ? 'portfolio' : (['agents', 'crm', 'templates', 'schedules', 'queues', 'routes', 'tags'].includes(activeTab) ? 'settings' : activeTab)} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Sada" />
        
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (selectedCaseId || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
