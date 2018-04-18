import {UserModel} from './user.model';

export interface PropertyModel {
  id: number;
  userId: number;
  user?: UserModel;
}
