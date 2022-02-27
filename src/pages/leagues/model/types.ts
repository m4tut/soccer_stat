export interface ILeaguesData {
  id: number;
  area: {
    name: string;
  };
  name: string;
}

export interface ITeamMatches {
  id: number;
  name: string;
}

export interface IScoreMatches {
  awayTeam: number;
  homeTeam: number;
}

export interface ILeaguesMatchesData {
  id: number;
  utcDate: string;
  status: string;
  homeTeam: ITeamMatches;
  awayTeam: ITeamMatches;
  score: {
    fullTime: IScoreMatches;
    extraTime: IScoreMatches;
    penalties: IScoreMatches;
  }
}

export interface ILeagues {
  count: number;
  competitions: ILeaguesData[];
}

export interface ILeaguesId {
  count: number;
  competitions: ILeaguesData;
  matches: ILeaguesMatchesData[];
}
