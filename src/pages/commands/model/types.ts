export interface ICommandsData {
  id: number;
  name: string;
  crestUrl: string;
}

export interface ICommands {
  count: number;
  teams: ICommandsData[];
}
