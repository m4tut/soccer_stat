import { FC, ReactNode } from 'react';

import cl from 'classnames';

// Styles
import classes from './Container.module.scss';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ className, children }) => (
  <div className={cl(className, classes.container)}>{children}</div>
);
