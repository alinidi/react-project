import { Route, Routes } from 'react-router';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Fallback } from './components/Fallback/Fallback';
import { About } from './components/About/About';
import { MainLayout } from './components/MainLayout/MainLayout';
import { DetailView } from './components/DetailView/DetailView';

function App() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/:page" element={<MainLayout />}>
          <Route path=":detailsId" element={<DetailView />} />
        </Route>
        <Route path="/about" element={<About />} />
      </Routes>

      {/* <ErrorButton /> */}
    </ErrorBoundary>
  );
}

export default App;
