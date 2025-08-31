import { Suspense } from 'react';
import './App.css';
import { MainPage } from './pages/MainPage';
import { Fallback } from './components/Fallback/Fallback';

function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <MainPage />
    </Suspense>
  );
}

export default App;
