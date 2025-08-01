import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import { Artworks } from '../components/Artworks/Artworks';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router';
import { store } from '../app/store';
import { Provider } from 'react-redux';

test('Renders artworks', () => {
  const mockData = [
    {
      id: 1,
      image_id: 1,
      title: 'Artwork',
      artist_display: 'Alina',
      date_end: 2025,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe3eTlFd7zZJvpCOJn7c63fwbT3U7jbl66qA&s',
    },
    {
      id: 2,
      image_id: 2,
      title: 'Artwork',
      artist_display: 'Alina',
      date_end: 2025,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe3eTlFd7zZJvpCOJn7c63fwbT3U7jbl66qA&s',
    },
  ];

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Artworks results={mockData} />
      </BrowserRouter>
    </Provider>
  );
  const wrapper = screen.getByTestId('artworks');

  expect(wrapper).toBeInTheDocument();
});
