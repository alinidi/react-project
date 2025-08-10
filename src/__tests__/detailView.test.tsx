import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, type Mock } from 'vitest';
import { DetailView } from '../components/DetailView/DetailView';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router';
import * as ReactRouter from 'react-router';
import * as api from './../services/api';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

vi.mock('./../services/api', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof api;
  return {
    ...actual,
    useGetArtworkByIdQuery: vi.fn(),
    useGetConfigEndpointQuery: vi.fn(),
  };
});

vi.spyOn(ReactRouter, 'useParams').mockReturnValue({
  detailsId: '2',
  page: '1',
});

describe('DetailView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders detailView', async () => {
    (api.useGetConfigEndpointQuery as Mock).mockReturnValue({
      data: 'https://api.artic.edu',
      isLoading: false,
      isFetching: false,
      error: null,
    });

    (api.useGetArtworkByIdQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <DetailView />
      </BrowserRouter>
    );
    const detailView = await screen.getByTestId('detailView');
    expect(detailView).toBeInTheDocument();
  });

  it('fetch details', async () => {
    const mockData = {
      title: 'Artwork',
      artist_display: 'Artist',
      description: 'Description',
      place_of_origin: 'Poland',
      proxiedUrl: 'https://example.com/image.jpg',
    };

    (api.useGetConfigEndpointQuery as Mock).mockReturnValue({
      data: 'https://api.artic.edu',
      isLoading: false,
      isFetching: false,
      error: null,
    });

    (api.useGetArtworkByIdQuery as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/1/2']}>
        <Routes>
          <Route path="/:page/:detailsId" element={<DetailView />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Artwork')).toBeInTheDocument();
      expect(screen.getByText('Artist')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Poland')).toBeInTheDocument();
    });

    const image = screen.getByAltText('image') as HTMLImageElement;
    expect(image.src).toBe(mockData.proxiedUrl);
  });

  it('handle close detailed view', async () => {
    const mockNavigate = vi.fn();

    vi.spyOn(ReactRouter, 'useNavigate').mockReturnValue(mockNavigate);
    vi.spyOn(ReactRouter, 'useParams').mockReturnValue({
      detailsId: '2',
      page: '1',
    });

    (api.useGetConfigEndpointQuery as Mock).mockReturnValue({
      data: 'https://api.artic.edu',
      isLoading: false,
      isFetching: false,
      error: null,
    });

    (api.useGetArtworkByIdQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <DetailView />
      </BrowserRouter>
    );

    const closeIcon = await screen.getByTestId('close-btn');

    await userEvent.click(closeIcon);

    expect(mockNavigate).toHaveBeenCalledWith('/1');
  });
});
