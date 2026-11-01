import React, { useState } from 'react';
import type { NavView, AITool } from './types';
import { MainLayout } from './layouts/MainLayout';
import { DashboardView } from './views/DashboardView';
import { CatalogView } from './views/CatalogView';
import { UseCasesPage } from './views/UseCasesPage';
import { TutorialsView } from './views/TutorialsView';
import { ToolDetailModal } from './components/ToolDetailModal';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<NavView>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedToolModal, setSelectedToolModal] = useState<AITool | null>(null);

  // If user types in global search while in another view, automatically switch to catalog view
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && activeView !== 'catalog') {
      setActiveView('catalog');
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardView
            onNavigate={setActiveView}
            onOpenToolDetails={setSelectedToolModal}
          />
        );
      case 'catalog':
        return (
          <CatalogView
            onOpenToolDetails={setSelectedToolModal}
            externalSearchQuery={searchQuery}
            onClearExternalSearch={() => setSearchQuery('')}
          />
        );
      case 'use-cases':
        return <UseCasesPage />;
      case 'tutorials':
        return <TutorialsView />;
      default:
        return (
          <DashboardView
            onNavigate={setActiveView}
            onOpenToolDetails={setSelectedToolModal}
          />
        );
    }
  };

  return (
    <>
      <MainLayout
        activeView={activeView}
        onSelectView={setActiveView}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      >
        {renderActiveView()}
      </MainLayout>

      {/* Global Tool Details Modal */}
      <ToolDetailModal
        tool={selectedToolModal}
        onClose={() => setSelectedToolModal(null)}
      />
    </>
  );
};

export default App;
