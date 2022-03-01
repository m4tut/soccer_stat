import { FC } from 'react';

// Config
import { ILeaguesMatchesData } from '~pages/leagues/model/types';

// Styles
import cl from 'classnames';
import styles from './MatchesItem.module.scss';

// статусы матчей
const STATUS_MATCHES = {
  SCHEDULED: 'Запланирован',
  LIVE: 'В прямом эфире',
  IN_PLAY: 'В игре',
  PAUSED: 'Пауза',
  FINISHED: 'Завершен',
  POSTPONED: 'Отложен',
  SUSPENDED: 'Приостановлен',
  CANCELED: 'Отменен',
};

interface MatchesItemProps {
  className?: string;
  data: ILeaguesMatchesData;
}

export const MatchesItem: FC<MatchesItemProps> = ({ className, data }) => {
  // получаем локальное время
  const date = new Date(data.utcDate);

  return (
    <div className={cl(className, styles['matches-item'])}>
      <time className={cl(styles['matches-item__time'])} dateTime={data.utcDate}>
        {date.toLocaleString('ru', { year: 'numeric', month: '2-digit', day: '2-digit' }) +
          ' ' +
          date.toLocaleString('ru', { hour: '2-digit', minute: '2-digit' })}
      </time>

      <div className={cl(styles['matches-item__status'])}>
        {STATUS_MATCHES[data.status as keyof typeof STATUS_MATCHES]}
      </div>

      <div className={cl(styles['matches-item__comands'])}>
        <span className={cl(styles['matches-item__comands-left'])}>{data.homeTeam.name}</span>
        <span className={cl(styles['matches-item__comands-vs'])}> - </span>
        <span className={cl(styles['matches-item__comands-right'])}>{data.awayTeam.name}</span>
      </div>

      <div className={cl(styles['matches-item__score'])}>
        {data.score.fullTime.homeTeam !== null && data.score.fullTime.awayTeam !== null ? (
          <div className={cl(styles['matches-item__score'])}>
            <span>{data.score.fullTime.homeTeam}</span>
            <span>:</span>
            <span>{data.score.fullTime.awayTeam}</span>
          </div>
        ) : (
          ''
        )}

        {data.score.extraTime.homeTeam !== null && data.score.extraTime.awayTeam !== null ? (
          <div className={cl(styles['matches-item__score'], styles['matches-item__score--faded'])}>
            <span>({data.score.extraTime.homeTeam}</span>
            <span>:</span>
            <span>{data.score.extraTime.awayTeam})</span>
          </div>
        ) : (
          ''
        )}

        {data.score.penalties.homeTeam !== null && data.score.penalties.awayTeam !== null ? (
          <div className={cl(styles['matches-item__score'], styles['matches-item__score--faded'])}>
            <span>({data.score.penalties.homeTeam}</span>
            <span>:</span>
            <span>{data.score.penalties.awayTeam})</span>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
