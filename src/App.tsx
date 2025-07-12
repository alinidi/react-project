import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { Fallback } from './components/Fallback/Fallback';
import { Result } from './components/Result';

function App() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Result />
      <ErrorButton />
    </ErrorBoundary>
  );
}

export default App;
