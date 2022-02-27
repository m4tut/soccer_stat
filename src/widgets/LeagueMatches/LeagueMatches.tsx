import { FC } from 'react';

// Config
import { ILeaguesMatchesData } from '~pages/leagues/model/types';

// Styles
import cl from 'classnames';
import styles from './LeagueMatches.module.scss'
import { MatchesItem } from '~entities/MatchesItem';

interface LeagueMatchesProps {
  className?: string;
  data: ILeaguesMatchesData[];
}

export const LeagueMatches: FC<LeagueMatchesProps> = ({data, className}) => {

  return (
    <div className={cl(className, styles['league-matches'])}>
      {data.map(item => <MatchesItem key={item.id} data={item} />)}
    </div>
   );
}
