import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { BurgerMenu } from '../common/BurgerMenu/BurgerMenu';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ThemeContext } from '../features/ThemeContext/ThemeContext';
import { MemoryRouter } from 'react-router';

const mockThemeContext = {
  theme: 'light',
  toggleTheme: () => {},
};

describe('BurgerMenu', () => {
  it('Renders burgerMenu', () => {
    render(
      <BurgerMenu
        handleOnChange={() => {}}
        searchedText={'cat'}
        handleOnClick={() => {}}
      />
    );

    expect(screen.getByTestId('burgerMenu')).toBeInTheDocument();
  });
  it('opens MenuList on Menu icon click', async () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <MemoryRouter>
          <BurgerMenu
            handleOnChange={() => {}}
            searchedText="cat"
            handleOnClick={() => {}}
          />
        </MemoryRouter>
      </ThemeContext.Provider>
    );

    expect(screen.queryByTestId('MenuList')).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('Menu'));

    await waitFor(() => {
      expect(screen.getByTestId('MenuList')).toBeInTheDocument();
    });
  });
});
