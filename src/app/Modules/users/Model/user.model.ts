import { SchoolingLevelEnum } from './schooling-level-enum';

export interface UserList {
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
