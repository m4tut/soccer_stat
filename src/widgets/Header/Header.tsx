import { FC } from 'react';
import cl from 'classnames';

// Config
import { navigationItems } from '~shared/config/navigation'

// Components
import { Container } from '~widgets/Container';
import Navigation from '~widgets/Navigation/Navigation';

// Styles
import styles from './Header.module.scss';

interface HeaderProps {
  className?: string,
}

export const Header: FC<HeaderProps> = ({className}) => {
  return (
    <header className={cl(className, styles['header'])} >
      <Container className={cl(styles['header__content'])}>
        <img className={cl(styles['header__content-logo'])} src={require('~assets/img/logo.png')} alt='logo' />

        <Navigation navigationItems={navigationItems} />
      </Container>
    </header>
  );
};
