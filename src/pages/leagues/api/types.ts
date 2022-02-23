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
