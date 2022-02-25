import { FC } from 'react';
import { useNavigate } from 'react-router';

// Config
import { ILeaguesData } from '~pages/leagues/model/types';

// Styles
import cl from 'classnames';
import styles from './LeaguesItems.module.scss';
import { LeaguesItem } from '~entities/LeaguesItem';


interface LeaguesItemsProps {
  data: ILeaguesData[];
  className?: string;
}

export const LeaguesItems: FC<LeaguesItemsProps> = ({ data, className }) => {
  const navigate = useNavigate();
  return (
    <div className={cl(className, styles['leagues-items'])}>
      {data.map(item => (
        <LeaguesItem key={item.id} name={item.name} country={item.area.name} onClick={() => navigate('/' + item.id)} />
      ))}
    </div>
  );
};
