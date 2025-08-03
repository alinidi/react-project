import { Link } from 'react-router';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Moon, Sun, X } from 'lucide-react';
import s from './BurgerMenu.module.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../features/ThemeContext/ThemeContext';
import type { MenuProps } from '../../types/types';

export const MenuList = (props: MenuProps) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={s.menuList}>
      <Input
        handleOnChange={props.handleOnChange}
        searchedText={props.searchedText}
      />
      <Button handleOnClick={props.handleOnClick}>Search</Button>
      <Link className={s.link} to={'/about'}>
        About
      </Link>
      <div onClick={toggleTheme}>
        {theme === 'light' ? (
          <Moon size={22} className={s.theme} style={{ cursor: 'pointer' }} />
        ) : (
          <Sun size={22} className={s.theme} style={{ cursor: 'pointer' }} />
        )}
      </div>
      <X onClick={props.toggleMenu} style={{ cursor: 'pointer' }} />
    </div>
  );
};
