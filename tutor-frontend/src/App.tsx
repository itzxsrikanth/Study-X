import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes/AppRouter';
import { Navigation } from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const Layout: React.FC = () => {
  const location = useLocation();
  const isLandingOrLogin = location.pathname === '/welcome' || location.pathname === '/login';

  return (
    <div className="min-h-screen bg-darkBg text-slate-100 flex flex-col font-sans">
      <Navigation />

      {isLandingOrLogin ? (
        <main className="flex-1">
          <AppRouter />
        </main>
      ) : (
        <div className="max-w-7xl mx-auto px-4 w-full flex gap-8 pt-24 pb-16 flex-1">
          <Sidebar />
          <main className="flex-1 min-w-0">
            <AppRouter />
          </main>
        </div>
      )}

      {!isLandingOrLogin && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
