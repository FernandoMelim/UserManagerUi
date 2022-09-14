import { ApiResponse } from 'src/app/response.mode';
import { SchoolingLevelEnum } from './schooling-level-enum';

export interface UserList extends ApiResponse {
  userList: UserModel[];
}

export interface UserModel {
  id: Number;
  name: String;
  surname: String;
  email: String;
  birthDate: Date;
  schoolingLevel: SchoolingLevelEnum;
}
