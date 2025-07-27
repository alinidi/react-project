import { render, screen } from '@testing-library/react';
import { it } from 'vitest';
import { MainLayout } from '../components/MainLayout/MainLayout';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router';

describe('MainLayout', () => {
  it('renders MainLayout', async () => {
    render(
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    );
    const mainLayout = await screen.getByTestId('mainLayout');
    expect(mainLayout).toBeInTheDocument();
  });

  it('renders outlet if detailsId is present', async () => {
    render(
      <MemoryRouter initialEntries={['/2/3']}>
        <Routes>
          <Route path="/:page/:detailsId" element={<MainLayout />}>
            <Route
              index
              element={<div data-testid="outlet">Outlet content</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});
