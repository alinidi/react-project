import { Route, Routes } from 'react-router';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
//import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { Fallback } from './components/Fallback/Fallback';
import { Result } from './components/Result';
import { About } from './components/About/About';

function App() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Result />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* <ErrorButton /> */}
    </ErrorBoundary>
  );
}

export default App;
