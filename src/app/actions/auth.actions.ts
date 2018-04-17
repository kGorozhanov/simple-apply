import {AuthFormModel} from '../models/auth-form.model';

export class Login {
  static readonly type = '[AUTH] LOGIN';

  constructor(public payload: AuthFormModel) {
  }
}

export class Logout {
  static readonly type = '[AUTH] LOGOUT';
}
