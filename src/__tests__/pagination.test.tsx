import { render, screen } from '@testing-library/react';
import { describe, it, vi, vitest } from 'vitest';
import { Pagination } from '../components/Pagination/Pagination';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Pagination', () => {
  it('active left button', async () => {
    const mockFn = vitest.fn();

    render(
      <Pagination current_page={5} total_pages={10} handlePageChange={mockFn} />
    );

    const leftArrow = screen.getByTestId('left-arrow');
    await userEvent.click(leftArrow);
    expect(mockFn).toHaveBeenCalled();
  });

  it('disabled right button', async () => {
    const mockFn = vitest.fn();

    render(
      <Pagination
        current_page={10}
        total_pages={10}
        handlePageChange={mockFn}
      />
    );

    const rightArrow = screen.getByTestId('right-arrow');
    await userEvent.click(rightArrow);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('handle page change', async () => {
    const mockFn = vi.fn();

    render(
      <Pagination current_page={5} total_pages={10} handlePageChange={mockFn} />
    );

    const leftArrow = screen.getByTestId('left-arrow');
    const rightArrow = screen.getByTestId('right-arrow');

    await userEvent.click(leftArrow);
    expect(mockFn).toHaveBeenCalledWith(4);

    await userEvent.click(rightArrow);
    expect(mockFn).toHaveBeenCalledWith(6);
  });
});
