import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { PortfolioView } from './views/PortfolioView';
import { InboxView } from './views/InboxView';
import { AnalyticsView } from './views/AnalyticsView';
import { CaseDetailView } from './views/CaseDetailView';
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
        return (
          <div className="p-8 flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Settings</h2>
              <p className="text-slate-500">Configuration module coming soon.</p>
            </div>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab === 'case-detail' ? 'portfolio' : activeTab} setActiveTab={setActiveTab} />
      
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
