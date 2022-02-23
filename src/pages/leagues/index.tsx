import { FC, FormEvent, useEffect, useState } from 'react';

// API
import { LeaguesAPI } from '~pages/leagues/api';
import { ILeaguesData } from '~pages/leagues/api/types';

// Config
import { LIMIT_LEAGUES_PAGE } from '~shared/constants';
import { defaultValueSelect, optionsSelect, placeholderInput } from './model/searchSettings';

// Hooks
import { useFetching } from '~shared/hooks/useFetching';

// Components
import { Container } from '~shared/layout/Container';
import { Viewer } from '~shared/layout/Viewer';
import { LeaguesItems } from '~widgets/LeaguesItems';
import { Loading } from '~shared/layout/Loading';
import { PageSearch } from '~features/PageSearch';
import { MySelect } from '~shared/ui/MySelect';


const Leagues: FC = () => {
  const [leagues, setLeagues] = useState<ILeaguesData[]>([]); // все лиги
  const [leaguesLenght, setLeaguesLenght] = useState<number>(0); // количество лиг
  const [page, setPage] = useState<ILeaguesData[]>([]); // лиги на текущей странице
  const [numPage, setNumPage] = useState<number>(0); // номер текущей страницы (индексация страниц с 0)

  const [value, setValue] = useState<string>(); // состояние инпута
  const [option, setOption] = useState<string>(defaultValueSelect); // состояние селекта

  // получить все лиги
  async function fetchLeagues() {
    const data = await LeaguesAPI.getAllLeagues();
    setLeagues(data.competitions);
    setLeaguesLenght(data.count);
    fetchLeaguesPage(data.competitions);
  }

  // получить лиги для страницы (пагинация)
  async function fetchLeaguesPage(data: ILeaguesData[]) {
    setPage(data.slice(numPage * LIMIT_LEAGUES_PAGE, numPage * LIMIT_LEAGUES_PAGE + LIMIT_LEAGUES_PAGE));
  }

  const [fetchLeaguesAll, isLoading, leaguesError] = useFetching(fetchLeagues);

  useEffect(() => {
    fetchLeaguesAll();
  }, []);

  useEffect(() => {
    fetchLeaguesPage(leagues);
  }, [numPage]);

  return (
    <Container>
      <Loading isLoading={isLoading} error={leaguesError}>
        <Viewer onChange={setNumPage} defaultPageSize={LIMIT_LEAGUES_PAGE} totalCountElem={leaguesLenght}>
          <PageSearch placeholder={placeholderInput} onSearch={setValue}>
            <MySelect defaultValue={option} options={optionsSelect} onChange={setOption} />
          </PageSearch>

          <LeaguesItems data={page} />
        </Viewer>
      </Loading>
    </Container>
  );
};

export default Leagues;
