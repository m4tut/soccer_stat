import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

// API
import { LeaguesAPI } from '../api';

// Config
import { ILeaguesId, ILeaguesMatchesData } from '../model/types';
import { LIMIT_MATCHES_PAGE } from '../model/constants';

// Hooks
import { useFetching } from '~shared/hooks/useFetching';
import usePagination from '~shared/hooks/usePagination';

// Styles
import cl from 'classnames';
import styles from './leaguesId.module.scss';

// Components
import { Container } from '~shared/layout/Container';
import { Loading } from '~shared/layout/Loading';
import { Viewer } from '~shared/layout/Viewer';
import { LeagueMatches } from '~widgets/LeagueMatches';
import Title from 'antd/lib/typography/Title';
import { MyBreadcrumb } from '~shared/ui/MyBreadcrumb';
import { IBreadcrumb } from '~shared/ui/MyBreadcrumb/types';

const LeaguesId: FC = () => {
  const { id = '' } = useParams<{ id: string }>();

  const [leaguesId, setLeaguesId] = useState<ILeaguesId>(); // матчи лиги
  const [page, leaguesIdLenght, numPage, setNumPage, fetchMatchesPage] =
    usePagination<ILeaguesMatchesData>(LIMIT_MATCHES_PAGE);

  // получить данные конкретной лиги
  async function fetchLeagues() {
    const data = await LeaguesAPI.getLeaguesId(id);
    setLeaguesId(data);
    fetchMatchesPage(data.matches);
  }

  const [fetchLeaguesId, isLoading, errorLeaguesId] = useFetching(fetchLeagues);

  useEffect(() => {
    fetchLeaguesId();
  }, []);

  useMemo(() => {
    const data: ILeaguesMatchesData[] = leaguesId?.matches!;
    fetchMatchesPage(data);
  }, [numPage]);

  // useMemo(() => {
  //   setNumPage(0);
  // }, []);

  // Constants
  const BREADCRUMBS: IBreadcrumb[] = [
    {
      text: 'Лиги',
      link: '/leagues',
    },
    {
      text: leaguesId?.competition.name!,
    },
  ];

  return (
    <Container className={cl(styles['leagues-id'])}>
      <Loading isLoading={isLoading} error={errorLeaguesId}>
        <Viewer onChange={setNumPage} defaultPageSize={LIMIT_MATCHES_PAGE} totalCountElem={leaguesIdLenght}>
          <MyBreadcrumb className={cl(styles['leagues-id__breadcrumb'])} breadcrumbs={BREADCRUMBS} />

          <Title className={cl(styles['leagues-id__title'])}>Матчи</Title>
          <LeagueMatches data={page} />
        </Viewer>
      </Loading>
    </Container>
  );
};

export default LeaguesId;
