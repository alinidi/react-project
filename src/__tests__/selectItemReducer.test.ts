import { describe, it } from 'vitest';
import reducer, {
  addItem,
  filterResults,
  removeAllItems,
  removeItem,
} from '../features/selectItem/selectItemSlice';

const mockResults = [
  {
    id: 1,
    image_id: 123,
    title: 'A',
    artist_display: 'Alina',
    date_end: 2025,
    imageUrl: 'string',
    place_of_origin: 'USA',
    description: 'Something',
  },
  {
    id: 2,
    image_id: 12,
    title: 'B',
    artist_display: 'Alina',
    date_end: 2025,
    imageUrl: 'string',
    place_of_origin: 'USA',
    description: 'Something',
  },
];

describe('selectItemReducer', () => {
  it('filterResults', () => {
    expect(filterResults(mockResults, 1)).toEqual([
      {
        id: 2,
        image_id: 12,
        title: 'B',
        artist_display: 'Alina',
        date_end: 2025,
        imageUrl: 'string',
        place_of_origin: 'USA',
        description: 'Something',
      },
    ]);
  });
  it('addItem', () => {
    const prevState = { count: 2, results: mockResults };
    const item = {
      id: 3,
      image_id: 123,
      title: 'A',
      artist_display: 'Alina',
      date_end: 2025,
      imageUrl: 'string',
      place_of_origin: 'USA',
      description: 'Something',
    };
    const expectedState = {
      count: 3,
      results: [...prevState.results, item],
    };

    const state = reducer(prevState, addItem(item));
    expect(state).toEqual(expectedState);
  });
  it('removeItem', () => {
    const prevState = { count: 2, results: mockResults };
    const item = {
      id: 1,
      image_id: 123,
      title: 'A',
      artist_display: 'Alina',
      date_end: 2025,
      imageUrl: 'string',
      place_of_origin: 'USA',
      description: 'Something',
    };
    const expectedState = {
      count: 1,
      results: [
        {
          id: 2,
          image_id: 12,
          title: 'B',
          artist_display: 'Alina',
          date_end: 2025,
          imageUrl: 'string',
          place_of_origin: 'USA',
          description: 'Something',
        },
      ],
    };

    const state = reducer(prevState, removeItem(item));
    expect(state).toEqual(expectedState);
  });
  it('removeAllItems', () => {
    const prevState = { count: 2, results: mockResults };
    const expectedState = { count: 0, results: [] };
    const state = reducer(prevState, removeAllItems());
    expect(state).toEqual(expectedState);
  });
});
