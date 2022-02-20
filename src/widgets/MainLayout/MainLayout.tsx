import { FC, ReactNode } from 'react';

import cl from 'classnames';

// Styles
import styles from './MainLayout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<LayoutProps> = ({ children }) => (
  <div className={cl(styles['MainLayout'])}>
    <main className={cl(styles['content'])}>{children}</main>
  </div>
);
