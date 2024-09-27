import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'contexts/user/AuthContext';

import MarketingHome from 'views/MarketingHome';

import ErrorBoundary from 'contexts/ErrorHandling/ErrorHandler';

const App = () => (
  <ErrorBoundary>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MarketingHome />} />
      </Routes>
    </AuthProvider>
  </ErrorBoundary>
);

export default App;
