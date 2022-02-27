import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

// API
import { LeaguesAPI } from '../api';

// Config
import { ILeaguesMatchesData } from '../model/types';
import { LIMIT_LEAGUES_MATCHES_PAGE } from '../model/constants';

// Hooks
import { useFetching } from '~shared/hooks/useFetching';

// Styles
import cl from 'classnames';
import styles from './leaguesId.module.scss'

// Components
import { Container } from '~shared/layout/Container';
import { Loading } from '~shared/layout/Loading';
import { Viewer } from '~shared/layout/Viewer';
import { LeagueMatches } from '~widgets/LeagueMatches';
import Title from 'antd/lib/typography/Title';

const LeaguesId: FC = () => {
  const { id = '' } = useParams<{ id: string }>();

  const [leaguesId, setLeaguesId] = useState<ILeaguesMatchesData[]>([]); // матчи лиги
  const [leaguesIdСount, setLeaguesIdСount] = useState<number>(0); // число матчей лиги
  const [numPage, setNumPage] = useState<number>(0); // номер текущей страницы (индексация страниц с 0)

  // получить данные конкретной лиги
  async function fetchLeagues() {
    const data = await LeaguesAPI.getLeaguesId(id);
    setLeaguesId(data.matches);
    setLeaguesIdСount(data.count);
  }

  const [fetchLeaguesId, isLoading, errorLeaguesId] = useFetching(fetchLeagues);

  useEffect(() => {
    fetchLeaguesId();
  }, []);

  return (
    <Container className={cl(styles['leagues-id'])}>
      <Loading isLoading={isLoading} error={errorLeaguesId}>
        <Viewer onChange={setNumPage} defaultPageSize={LIMIT_LEAGUES_MATCHES_PAGE} totalCountElem={leaguesIdСount}>
          <Title className={cl(styles['leagues-id__title'])}>Матчи</Title>
          <LeagueMatches data={leaguesId} />
        </Viewer>
      </Loading>
    </Container>
  );
};

export default LeaguesId;
