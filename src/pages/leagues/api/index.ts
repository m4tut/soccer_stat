import axios from 'axios';

// Config
import { INSTANCE_API } from '~shared/api';
import { ILeagues, ILeaguesId } from '../model/types';

const instance = axios.create(INSTANCE_API);

export class LeaguesAPI {
  // получить все лиги
  static async getAllLeagues() {
    const response = await instance.get<ILeagues>('/competitions');
    return response.data;
  }

  // получить матчи лиги
  static async getLeaguesId(id: string) {
    const response = await instance.get<ILeaguesId>(`/competitions/${id}/matches`);
    return response.data;
  }

  // получить матчи лиги из интервала дат
  static async getLeaguesIdDateRange(id: string, dateStart: string, dateEnd: string) {
    const response = await instance.get<ILeaguesId>(`/competitions/${id}/matches?dateFrom=${dateStart}&dateTo=${dateEnd}`);
    return response.data;
  }
}
