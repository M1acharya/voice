import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import PromptManagementPage from './pages/PromptManagementPage';
import ApiKeysPage from './pages/ApiKeysPage';
import AgentControlsPage from './pages/AgentControlsPage';
import LiveCallsPage from './pages/LiveCallsPage';
import LeadsPage from './pages/LeadsPage';
import SettingsPage from './pages/SettingsPage';

const PAGES = {
  'dashboard':          DashboardPage,
  'prompt-management':  PromptManagementPage,
  'api-keys':           ApiKeysPage,
  'agent-controls':     AgentControlsPage,
  'live-calls':         LiveCallsPage,
  'leads':              LeadsPage,
  'settings':           SettingsPage,
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const PageComponent = PAGES[activePage] || DashboardPage;

  return (
    <div className="min-h-screen bg-[#f4f6fa]">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isMobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content — offset by sidebar width on large screens */}
      <div className="lg:pl-64 min-h-screen flex flex-col">
        <Header
          activePage={activePage}
          onMobileMenuOpen={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6">
          <PageComponent key={activePage} />
        </main>
      </div>
    </div>
  );
}
