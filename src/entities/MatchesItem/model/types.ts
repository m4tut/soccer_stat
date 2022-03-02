export interface ITeamMatches {
  id: number;
  name: string;
}

export interface IScoreMatches {
  awayTeam: number;
  homeTeam: number;
}

export interface IMatchesData {
  id: number;
  utcDate: string;
  status: string;
  homeTeam: ITeamMatches;
  awayTeam: ITeamMatches;
  score: {
    fullTime: IScoreMatches;
    extraTime: IScoreMatches;
    penalties: IScoreMatches;
  };
}
