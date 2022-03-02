import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

// API
import { CommandsAPI } from '../api';

// Config
import { IMatchesData } from '~entities/MatchesItem/model/types';
import { LIMIT_COMANDS_MATCHES_PAGE } from '../model/constants';
import { RangeValue } from 'rc-picker/lib/interface';
import { Moment } from 'moment';

// Hooks
import { useFetching } from '~shared/hooks/useFetching';
import usePagination from '~shared/hooks/usePagination';

// Styles
import cl from 'classnames';
import styles from './comandsId.module.scss';

// Components
import { Container } from '~shared/layout/Container';
import { Loading } from '~shared/layout/Loading';
import { Viewer } from '~shared/layout/Viewer';
import { LeagueMatches } from '~widgets/LeagueMatches';
import Title from 'antd/lib/typography/Title';
import { MyBreadcrumb } from '~shared/ui/MyBreadcrumb';
import { IBreadcrumb } from '~shared/ui/MyBreadcrumb/types';
import { ConfigProvider, DatePicker } from 'antd';

// Locale
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';

const ComandsId: FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [comandsId, setComandsId] = useState<IMatchesData[]>([]); // матчи команды
  const [nameComandsId, setNameComandsId] = useState<string>(''); // название лиги
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(); // состояние RangePicker
  const [page, leaguesIdLenght, numPage, setNumPage, fetchMatchesPage] =
    usePagination<IMatchesData>(LIMIT_COMANDS_MATCHES_PAGE);

  // получить матчи конкретной лиги
  async function fetchComands() {
    const data = await CommandsAPI.getCommandId(id);
    const nameComand = await CommandsAPI.getCommandNameId(id);
    setComandsId(data.matches);
    fetchMatchesPage(data.matches);
    setNameComandsId(nameComand);
  }

  const [fetchComandsId, isLoading, errorLeaguesId] = useFetching(fetchComands);

  useEffect(() => {
    fetchComandsId();
  }, []);

  useMemo(async () => {
    const dateRangeObj = {
      dateStart: dateRange?.[0]?.format('YYYY-MM-DD'),
      dateEnd: dateRange?.[1]?.format('YYYY-MM-DD'),
    };

    let data = comandsId;

    if (dateRangeObj.dateStart !== undefined && dateRangeObj.dateEnd !== undefined) {
      const dateRange = await CommandsAPI.getComandsIdDateRange(id, dateRangeObj.dateStart, dateRangeObj.dateEnd);
      data = dateRange.matches;
    }

    fetchMatchesPage(data);
  }, [numPage, dateRange]);

  useMemo(async () => {
    setNumPage(0);
  }, [dateRange]);

  // Constants
  const BREADCRUMBS: IBreadcrumb[] = [
    {
      text: 'Команды',
      link: '/commands',
    },
    {
      text: nameComandsId,
    },
  ];

  return (
    <Container className={cl(styles['commands-id'])}>
      <Loading isLoading={isLoading} error={errorLeaguesId}>
        <Viewer
          onChange={setNumPage}
          current={numPage + 1}
          defaultPageSize={LIMIT_COMANDS_MATCHES_PAGE}
          totalCountElem={leaguesIdLenght}
        >
          <MyBreadcrumb className={cl(styles['commands-id__breadcrumb'])} breadcrumbs={BREADCRUMBS} />

          <Title className={cl(styles['commands-id__title'])}>Матчи</Title>

          <div className={cl(styles['commands-id__block'])}>
            <ConfigProvider locale={locale}>
              <DatePicker.RangePicker
                className={cl(styles['commands-id__range-picker'])}
                dropdownClassName={cl(styles['commands-id__range-picker-dropdown'])}
                onChange={moment => setDateRange(moment)}
              />
            </ConfigProvider>
          </div>
          <LeagueMatches data={page} />
        </Viewer>
      </Loading>
    </Container>
  );
};

export default ComandsId;
