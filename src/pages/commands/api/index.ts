import axios from 'axios';
import { ICommands } from '../model/types';

// Config
import { INSTANCE_API } from '~shared/api';

const instance = axios.create(INSTANCE_API);

export class CommandsAPI {
  // получить все лиги
  static async getAllCommands() {
    const response = await instance.get<ICommands>('/teams');
    return response.data;
  }

  // получить все лиги
  static async getCommandMatches(id: string) {
    const response = await instance.get(`/teams/${id}/matches`);
    return response.data;
  }

  // получить все лиги из интервала дат
  static async getComandsIdDateRange(id: string, dateStart: string, dateEnd: string) {
    const response = await instance.get(
      `/teams/${id}/matches?dateFrom=${dateStart}&dateTo=${dateEnd}`
    );
    return response.data;
  }
}
