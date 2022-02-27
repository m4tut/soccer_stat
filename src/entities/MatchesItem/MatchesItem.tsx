import { FC } from 'react';

// Config
import { ILeaguesMatchesData } from '~pages/leagues/model/types';

// Styles
import cl from 'classnames';
import styles from './MatchesItem.module.scss'

interface MatchesItemProps {
  className?: string;
  data: ILeaguesMatchesData;
}

export const MatchesItem: FC<MatchesItemProps> = ({className, data}) => {

  return (
    <div className={cl(className, styles['matches-item'])}>
      <time className={cl(styles['matches-item__time'])} dateTime={data.utcDate}>
        <span>{data.utcDate}</span>
        <span>{data.utcDate}</span>
      </time>

      <div className={cl(styles['matches-item__status'])}>
        {data.status}
      </div>

      <div className={cl(styles['matches-item__comands'])}>
        <span>{data.homeTeam.name}</span>
        <span>-</span>
        <span>{data.awayTeam.name}</span>
      </div>

      <div className={cl(styles['matches-item__score'])}>
        <div className={cl(styles['matches-item__score'])}>
          <span>{data.score.fullTime.homeTeam}</span>
          <span>:</span>
          <span>{data.score.fullTime.awayTeam}</span>
        </div>

        <div className={cl(styles['matches-item__score'])}>
          <span>{data.score.extraTime.homeTeam}</span>
          <span>:</span>
          <span>{data.score.extraTime.awayTeam}</span>
        </div>

        <div className={cl(styles['matches-item__score'])}>
          <span>{data.score.penalties.homeTeam}</span>
          <span>:</span>
          <span>{data.score.penalties.awayTeam}</span>
        </div>
      </div>
    </div>
   );
}