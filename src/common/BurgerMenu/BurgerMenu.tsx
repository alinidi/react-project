import { Menu } from 'lucide-react';
import { useState } from 'react';
import { MenuList } from './MenuList';
import type { HeaderProps } from '../../types/types';
import s from './BurgerMenu.module.scss';

export const BurgerMenu = (props: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div data-testid="burgerMenu">
      <Menu
        data-testid="Menu"
        onClick={toggleMenu}
        className={isOpen ? s.open : s.close}
      />
      {isOpen ? (
        <div className={s.overlay}>
          <MenuList
            handleOnChange={props.handleOnChange}
            searchedText={props.searchedText}
            handleOnClick={props.handleOnClick}
            toggleMenu={toggleMenu}
          ></MenuList>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
