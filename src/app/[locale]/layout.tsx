import { Providers } from 'app/Providers';
import { ErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';
import { Fallback } from 'components/Fallback/Fallback';
import { ThemeProvider } from 'features/ThemeContext/ThemeProvider';
import { routing } from 'i18n/routing';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import '../../App.css';
import '../../index.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <ErrorBoundary fallback={<Fallback />}>
            <ThemeProvider>
              <Providers>{children}</Providers>
            </ThemeProvider>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
