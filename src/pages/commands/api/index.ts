import axios from 'axios';
import { ICommands } from '../model/types';

// Config
import { INSTANCE_API } from '~shared/constants';

const instance = axios.create(INSTANCE_API);

export class CommandsAPI {
  // получить все лиги
  static async getAllCommands() {
    const response = await instance.get<ICommands>('/teams');

    return response.data;
  }
}
