import {UserModel} from './user.model';
import {PropertyModel} from './property.model';

export interface LocalApplicationModel {
  price: number;
  deposit: number;
}

export interface ApplicationModel extends LocalApplicationModel {
  id?: number;
  propertyId: number;
  userId: number;
  user?: UserModel;
  property?: PropertyModel;
}
