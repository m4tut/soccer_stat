import { FC } from 'react';

import cl from 'classnames';

// Config
import { INavItem } from '~shared/config/navigation/types';

// Styles
import styles from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';

interface NavigationProps {
  className?: string;
  navigationItems: INavItem[];
}

const Navigation: FC<NavigationProps> = ({ navigationItems, className }) => {
  return (
    <nav className={cl(className, styles['nav'])}>
      {navigationItems.map(navItem => (
        <NavLink className={(nav) => nav.isActive ? cl(styles['nav__item'], styles['active']) : cl(styles['nav__item'])} key={navItem.path} to={navItem.path} >
          {navItem.text}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
