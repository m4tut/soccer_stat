import { FC, ReactNode, Suspense } from 'react';

import cl from 'classnames';

// Components
import { Spin } from 'antd';

// Styles
import styles from './MainLayout.module.scss';
import { Header } from '~widgets/Header';

interface LayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<LayoutProps> = ({ children }) => (
  <div className={cl(styles['MainLayout'])}>
    <Header />
    <main className={cl(styles['content'])}>
    <Suspense fallback={<Spin delay={300} className="overlay" size="large" />}>
      {children}
    </Suspense>
    </main>
  </div>
);
