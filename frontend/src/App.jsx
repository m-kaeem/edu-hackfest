import React, { useState } from 'react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderPage = () => {
    if (!isLoggedIn && currentPage !== 'landing') {
      return <Landing onLogin={() => setIsLoggedIn(true)} />;
    }

    switch (currentPage) {
      case 'landing':
        return <Landing onLogin={() => setIsLoggedIn(true)} />;
      case 'dashboard':
        return <Dashboard />;
      case 'scanner':
        return <Scanner />;
      default:
        return <Landing />;
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;