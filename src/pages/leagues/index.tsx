import { FC, useEffect, useMemo, useState } from 'react';

// API
import { LeaguesAPI } from '~pages/leagues/api';

// Config
import { LIMIT_LEAGUES_PAGE } from './model/constants';
import { PLACEHOLDER_INPUT_SEARCH, SEARCH_WARNING_MESSAGE } from '~shared/constants/message';
import { ILeaguesData } from '~pages/leagues/model/types';
import { IOptions } from '~shared/ui/MySelect/types';

// Hooks
import { useFetching } from '~shared/hooks/useFetching';
import usePagination from '~shared/hooks/usePagination';

// Components
import { Container } from '~shared/layout/Container';
import { Viewer } from '~shared/layout/Viewer';
import { LeaguesItems } from '~widgets/LeaguesItems';
import { Loading } from '~shared/layout/Loading';
import { PageSearch } from '~features/PageSearch';
import { MySelect } from '~shared/ui/MySelect';
import { Alert } from 'antd';

const Leagues: FC = () => {
  // Constants
  const DEFAULT_VALUE_SELECT: string = 'league';

  const OPTIONS_SELECT: IOptions[] = [
    { text: 'Лига', value: 'league' },
    { text: 'Страна', value: 'country' },
  ];

  const [leagues, setLeagues] = useState<ILeaguesData[]>([]); // все лиги
  const [page, leaguesLenght, numPage, setNumPage, fetchLeaguesPage] = usePagination<ILeaguesData>(LIMIT_LEAGUES_PAGE);

  const [value, setValue] = useState<string>(''); // состояние инпута
  const [option, setOption] = useState<string>(DEFAULT_VALUE_SELECT); // состояние селекта

  // получить все лиги
  async function fetchLeagues() {
    const data = await LeaguesAPI.getAllLeagues();
    setLeagues(data.competitions);
    fetchLeaguesPage(data.competitions);
  }

  // фильтрация
  function filters(data: ILeaguesData[]): ILeaguesData[] {
    switch (option) {
      case OPTIONS_SELECT[0].value:
        data = data.filter(item => item.name.toLowerCase().includes(value));
        break;

      case OPTIONS_SELECT[1].value:
        data = data.filter(item => item.area.name.toLowerCase().includes(value));
        break;
    }

    return data;
  }

  const [fetchLeaguesAll, isLoading, leaguesError] = useFetching(fetchLeagues);

  useEffect(() => {
    fetchLeaguesAll();
  }, []);

  useMemo(() => {
    const data: ILeaguesData[] = filters(leagues);
    fetchLeaguesPage(data);
  }, [numPage, value, option]);

  useMemo(() => {
    setNumPage(0);
  }, [value, option]);

  return (
    <Container>
      <Loading isLoading={isLoading} error={leaguesError}>
        <Viewer
          onChange={setNumPage}
          current={numPage + 1}
          defaultPageSize={LIMIT_LEAGUES_PAGE}
          totalCountElem={leaguesLenght}
        >
          <PageSearch placeholder={PLACEHOLDER_INPUT_SEARCH} onSearch={setValue}>
            <MySelect defaultValue={option} options={OPTIONS_SELECT} onChange={setOption} />
          </PageSearch>

          {page.length ? (
            <LeaguesItems data={page} />
          ) : (
            <Alert message={SEARCH_WARNING_MESSAGE} type='warning' showIcon closable />
          )}
        </Viewer>
      </Loading>
    </Container>
  );
};

export default Leagues;
