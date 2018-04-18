import {LocalApplicationModel} from '../models/application.model';

export class LoadApply {
  static readonly type = '[APPLY] LOAD';
}

export class ResetApply {
  static readonly type = '[APPLY] RESET';
}

export class SubmitApply {
  static readonly type = '[APPLY] SUBMIT';

  constructor(public payload: LocalApplicationModel) {
  }
}
