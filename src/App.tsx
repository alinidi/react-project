import { Route, Routes } from 'react-router';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Fallback } from './components/Fallback/Fallback';
import { About } from './components/About/About';
import { MainLayout } from './components/MainLayout/MainLayout';
import { DetailView } from './components/DetailView/DetailView';
import { NotFound } from './components/NotFound/NotFound';
import { ThemeProvider } from './features/ThemeContext/ThemeProvider';

function App() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/:page" element={<MainLayout />}>
            <Route path=":detailsId" element={<DetailView />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
