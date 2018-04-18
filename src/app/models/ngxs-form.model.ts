import {PlainObjectModel} from './plain-object.model';

export interface NgxsFormModel<T = any> {
  model: T;
  dirty: boolean;
  status: string;
  errors: PlainObjectModel<any>;
}
