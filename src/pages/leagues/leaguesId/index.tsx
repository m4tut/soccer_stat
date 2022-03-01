import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

// API
import { LeaguesAPI } from '../api';

// Config
import { ILeaguesMatchesData } from '../model/types';
import { LIMIT_MATCHES_PAGE } from '../model/constants';
import { RangeValue } from 'rc-picker/lib/interface';
import { Moment } from 'moment';

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
import { ConfigProvider, DatePicker } from 'antd';

// Locale
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';

const LeaguesId: FC = () => {
  const { id = '' } = useParams<{ id: string }>();

  const [leaguesId, setLeaguesId] = useState<ILeaguesMatchesData[]>([]); // матчи лиги
  const [nameLeaguesId, setNameLeaguesId] = useState<string>(''); // название лиги
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(); // состояние RangePicker
  const [page, leaguesIdLenght, numPage, setNumPage, fetchMatchesPage] =
    usePagination<ILeaguesMatchesData>(LIMIT_MATCHES_PAGE);

  // получить матчи конкретной лиги
  async function fetchLeagues() {
    const data = await LeaguesAPI.getLeaguesId(id);
    setLeaguesId(data.matches);
    fetchMatchesPage(data.matches);
    setNameLeaguesId(data.competition.name);
  }

  const [fetchLeaguesId, isLoading, errorLeaguesId] = useFetching(fetchLeagues);

  useEffect(() => {
    fetchLeaguesId();
  }, []);

  useMemo(async () => {
    const dateRangeObj = {
      dateStart: dateRange?.[0]?.format('YYYY-MM-DD'),
      dateEnd: dateRange?.[1]?.format('YYYY-MM-DD'),
    };

    let data = leaguesId;

    if (dateRangeObj.dateStart !== undefined && dateRangeObj.dateEnd !== undefined) {
      const dateRange = await LeaguesAPI.getLeaguesIdDateRange(id, dateRangeObj.dateStart, dateRangeObj.dateEnd);
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
      text: 'Лиги',
      link: '/leagues',
    },
    {
      text: nameLeaguesId,
    },
  ];

  return (
    <Container className={cl(styles['leagues-id'])}>
      <Loading isLoading={isLoading} error={errorLeaguesId}>
        <Viewer
          onChange={setNumPage}
          current={numPage + 1}
          defaultPageSize={LIMIT_MATCHES_PAGE}
          totalCountElem={leaguesIdLenght}
        >
          <MyBreadcrumb className={cl(styles['leagues-id__breadcrumb'])} breadcrumbs={BREADCRUMBS} />

          <Title className={cl(styles['leagues-id__title'])}>Матчи</Title>

          <div className={cl(styles['leagues-id__block'])}>
            <ConfigProvider locale={locale}>
              <DatePicker.RangePicker
                className={cl(styles['leagues-id__range-picker'])}
                dropdownClassName={cl(styles['leagues-id__range-picker-dropdown'])}
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

export default LeaguesId;
