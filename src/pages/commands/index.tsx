import { FC, useEffect, useMemo, useState } from 'react';

// API
import { CommandsAPI } from './api';

// Config
import { LIMIT_COMANDS_PAGE } from './model/constants';
import { PLACEHOLDER_INPUT_SEARCH, SEARCH_WARNING_MESSAGE } from '~shared/constants/message';
import { ICommandsData } from './model/types';

// Hooks
import { useFetching } from '~shared/hooks/useFetching';

// Components
import { Container } from '~shared/layout/Container';
import { Loading } from '~shared/layout/Loading';
import { Viewer } from '~shared/layout/Viewer';
import { Alert } from 'antd';
import { PageSearch } from '~features/PageSearch';
import { CommandsItems } from '~widgets/CommandsItems';


const Commands: FC = () => {
  const [commands, setCommands] = useState<ICommandsData[]>([]); // все лиги
  const [commandsLenght, setCommandsLenght] = useState<number>(0); // количество лиг
  const [page, setPage] = useState<ICommandsData[]>([]); // лиги на текущей странице
  const [numPage, setNumPage] = useState<number>(0); // номер текущей страницы (индексация страниц с 0)

  const [value, setValue] = useState<string>(''); // состояние инпута

  // получить все лиги
  async function fetchCommands() {
    const data = await CommandsAPI.getAllCommands();
    setCommands(data.teams);
    setCommandsLenght(data.count);
    fetchCommandsPage(data.teams);
  }

  // получить лиги для страницы (пагинация)
  async function fetchCommandsPage(data: ICommandsData[]) {
    setPage(data.slice(numPage * LIMIT_COMANDS_PAGE, numPage * LIMIT_COMANDS_PAGE + LIMIT_COMANDS_PAGE));
  }

  // фильтрация
  function filters(data: ICommandsData[]): ICommandsData[] {
    return data.filter(item => item.name.toLowerCase().includes(value));
  }

  const [fetchCommandsAll, isLoading, commandsError] = useFetching(fetchCommands);

  useEffect(() => {
    fetchCommandsAll();
  }, []);

  useMemo(() => {
    const data: ICommandsData[] = filters(commands);
    setCommandsLenght(data.length);
    fetchCommandsPage(data);
  }, [numPage, value]);

  return (
    <Container>
      <Loading isLoading={isLoading} error={commandsError}>
        <Viewer onChange={setNumPage} defaultPageSize={LIMIT_COMANDS_PAGE} totalCountElem={commandsLenght}>
          <PageSearch placeholder={PLACEHOLDER_INPUT_SEARCH} onSearch={setValue}>
          </PageSearch>
          {page.length ? <CommandsItems data={page} /> : <Alert message={SEARCH_WARNING_MESSAGE} type="warning" showIcon closable />}
        </Viewer>
      </Loading>
    </Container>
  );
};

export default Commands;
