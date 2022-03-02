import axios from 'axios';
import { ICommands, ICommandsId } from '../model/types';

// Config
import { INSTANCE_API } from '~shared/api';

const instance = axios.create(INSTANCE_API);

export class CommandsAPI {
  // получить все лиги
  static async getAllCommands() {
    const response = await instance.get<ICommands>('/teams');
    return response.data;
  }

  // получить все матчи команды
  static async getCommandId(id: string) {
    const response = await instance.get<ICommandsId>(`/teams/${id}/matches`);
    return response.data;
  }

  // получить имя команды
  static async getCommandNameId(id: string) {
    const response = await instance.get(`/teams/${id}`);
    return response.data.name;
  }

  // получить все матчи команды из интервала дат
  static async getComandsIdDateRange(id: string, dateStart: string, dateEnd: string) {
    const response = await instance.get<ICommandsId>(`/teams/${id}/matches?dateFrom=${dateStart}&dateTo=${dateEnd}`);
    return response.data;
  }
}
