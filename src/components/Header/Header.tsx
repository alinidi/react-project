import s from './Header.module.scss';
import logo from '../../assets/logo.svg';
import darkLogo from '../../assets/dark-logo.png';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import type { HeaderProps } from '../../types/types';
import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../features/ThemeContext/ThemeContext';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { BurgerMenu } from '../../common/BurgerMenu/BurgerMenu';
import Image from 'next/image';
import Link from 'next/link';

export const Header = (props: HeaderProps) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const width = useWindowWidth();

  return (
    <div className={s.headerWrapper}>
      <Image
        src={theme === 'dark' ? darkLogo : logo}
        alt="logo"
        className={s.logo}
        width={100}
        height={0}
        style={{ height: 'auto', width: '7rem' }}
      />
      {width > 700 ? (
        <div className={s.searchWrapper}>
          <Input
            handleOnChange={props.handleOnChange}
            searchedText={props.searchedText}
          />
          <Button handleOnClick={props.handleOnClick}>Search</Button>
          <Link className={s.link} href={'/about'}>
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
