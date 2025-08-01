import { render, screen } from '@testing-library/react';
import { it } from 'vitest';
import { MainLayout } from '../components/MainLayout/MainLayout';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../app/store';

describe('MainLayout', () => {
  it('renders MainLayout', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </Provider>
    );
    const mainLayout = await screen.getByTestId('mainLayout');
    expect(mainLayout).toBeInTheDocument();
  });

  it('renders outlet if detailsId is present', async () => {
    render(
      <Provider store={store}>
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
      </Provider>
    );

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});
