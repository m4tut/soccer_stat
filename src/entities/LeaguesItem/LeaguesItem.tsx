import { FC } from 'react';

// Styles
import cl from 'classnames';
import styles from './LeaguesItem.module.scss';

interface LeaguesItemProps {
  className?: string;
  name: string;
  country: string;
  onClick: () => void;
}

export const LeaguesItem: FC<LeaguesItemProps> = ({ className, name, country, onClick }) => {
  return (
    <div className={cl(className, styles['leagues-item'])} onClick={() => onClick()}>
      <div className={cl(styles['leagues-item__name'])}>{name}</div>
      <div className={cl(styles['leagues-item__country'])}>{country}</div>
    </div>
  );
};
