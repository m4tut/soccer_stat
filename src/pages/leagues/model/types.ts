import { IMatchesData } from '~entities/MatchesItem/model/types';

export interface ILeaguesData {
  id: number;
  area: {
    name: string;
  };
  name: string;
}

export interface ILeagues {
  count: number;
  competitions: ILeaguesData[];
}

export interface ILeaguesId {
  count: number;
  competition: ILeaguesData;
  matches: IMatchesData[];
}
