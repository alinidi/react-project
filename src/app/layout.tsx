import { ErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';
import { Fallback } from 'components/Fallback/Fallback';
import { ThemeProvider } from 'features/ThemeContext/ThemeProvider';
import { Providers } from './Providers';
import '../App.css';
import '../index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary fallback={<Fallback />}>
          <ThemeProvider>
            <Providers>{children}</Providers>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
