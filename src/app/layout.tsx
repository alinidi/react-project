import { ErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';
import { Fallback } from 'components/Fallback/Fallback';
import { ThemeProvider } from 'features/ThemeContext/ThemeProvider';
import '../App.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary fallback={<Fallback />}>
          <ThemeProvider>{children}</ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
