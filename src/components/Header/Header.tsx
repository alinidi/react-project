import s from './Header.module.scss';
import logo from './../../assets/logo.svg';
import darkLogo from './../../assets/dark-logo.png';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import type { HeaderProps } from '../../types/types';
import { Link } from 'react-router';
import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../features/ThemeContext/ThemeContext';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { BurgerMenu } from '../../common/BurgerMenu/BurgerMenu';

export const Header = (props: HeaderProps) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const width = useWindowWidth();

  return (
    <div className={s.headerWrapper}>
      <img
        className={s.logo}
        src={theme === 'dark' ? darkLogo : logo}
        alt="logo"
      />
      {width > 700 ? (
        <div className={s.searchWrapper}>
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
              <Moon size={22} className={s.theme} />
            ) : (
              <Sun size={22} className={s.theme} />
            )}
          </div>
        </div>
      ) : (
        <BurgerMenu
          handleOnChange={props.handleOnChange}
          searchedText={props.searchedText}
          handleOnClick={props.handleOnClick}
        ></BurgerMenu>
      )}
    </div>
  );
};
