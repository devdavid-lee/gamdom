import { BettingEventsPage } from '@/pages/BettingEvents';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { NotFoundPage } from '@/pages/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/Layout/Layout';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: 15000,
      gcTime: 5 * 60 * 1000,
      refetchOnMount: true,
      refetchOnReconnect: true,
      networkMode: 'online',
      structuralSharing: true,
    },
    mutations: {
      retry: 1,
      networkMode: 'online',
    },
  },
});

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <Router>
              <Layout>
                <ToastContainer />
                <Routes>
                  <Route path="/" element={<Navigate to="/events" />} />
                  <Route path="/events" element={<BettingEventsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </Router>
        </ThemeProvider>
      </QueryClientProvider>
  )
}

export default App
