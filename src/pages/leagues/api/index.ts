import axios from 'axios';
import { ILeagues } from './types';

// Config
import { INSTANCE_API } from '~shared/constants';

const instance = axios.create(INSTANCE_API);

export class LeaguesAPI {
  // получить все лиги
  static async getAllLeagues() {
    const response = await instance.get<ILeagues>('/competitions');
    return response.data;
  }
}
