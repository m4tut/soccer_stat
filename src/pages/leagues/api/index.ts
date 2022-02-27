import axios from 'axios';

// Config
import { INSTANCE_API } from '~shared/constants/api';
import { ILeagues, ILeaguesId } from '../model/types';

const instance = axios.create(INSTANCE_API);

export class LeaguesAPI {
  // получить все лиги
  static async getAllLeagues() {
    const response = await instance.get<ILeagues>('/competitions');
    return response.data;
  }

  // получить конкретную лигу
  static async getLeaguesId(id: string) {
    const response = await instance.get<ILeaguesId>(`/competitions/${id}/matches`);
    return response.data;
  }
}
