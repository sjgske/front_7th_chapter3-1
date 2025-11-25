import React from 'react';

import { ManagementPage } from './pages/ManagementPage';
import { Header } from './components/layout';

export const App: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      <Header />
      <main>
        <ManagementPage />
      </main>
    </div>
  );
};
