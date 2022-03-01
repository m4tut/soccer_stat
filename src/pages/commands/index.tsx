import { FC, useEffect, useMemo, useState } from 'react';

// API
import { CommandsAPI } from './api';

// Config
import { LIMIT_COMANDS_PAGE } from './model/constants';
import { PLACEHOLDER_INPUT_SEARCH, SEARCH_WARNING_MESSAGE } from '~shared/constants/message';
import { ICommandsData } from './model/types';

// Hooks
import { useFetching } from '~shared/hooks/useFetching';
import usePagination from '~shared/hooks/usePagination';

// Components
import { Container } from '~shared/layout/Container';
import { Loading } from '~shared/layout/Loading';
import { Viewer } from '~shared/layout/Viewer';
import { Alert } from 'antd';
import { PageSearch } from '~features/PageSearch';
import { CommandsItems } from '~widgets/CommandsItems';

const Commands: FC = () => {
  const [commands, setCommands] = useState<ICommandsData[]>([]); // все команды
  const [page, commandsLenght, numPage, setNumPage, fetchCommandsPage] =
    usePagination<ICommandsData>(LIMIT_COMANDS_PAGE);

  const [value, setValue] = useState<string>(''); // состояние инпута

  // получить все лиги
  async function fetchCommands() {
    const data = await CommandsAPI.getAllCommands();
    setCommands(data.teams);
    fetchCommandsPage(data.teams);
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
    fetchCommandsPage(data);
  }, [numPage, value]);

  useMemo(() => {
    setNumPage(0);
  }, [value]);

  return (
    <Container>
      <Loading isLoading={isLoading} error={commandsError}>
        <Viewer
          onChange={setNumPage}
          current={numPage + 1}
          defaultPageSize={LIMIT_COMANDS_PAGE}
          totalCountElem={commandsLenght}
        >
          <PageSearch placeholder={PLACEHOLDER_INPUT_SEARCH} onSearch={setValue}></PageSearch>
          {page.length ? (
            <CommandsItems data={page} />
          ) : (
            <Alert message={SEARCH_WARNING_MESSAGE} type='warning' showIcon closable />
          )}
        </Viewer>
      </Loading>
    </Container>
  );
};

export default Commands;
