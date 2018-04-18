import {Action, Actions, ofActionDispatched, Selector, State, StateContext, Store} from '@ngxs/store';
import {LoadApply, ResetApply, SubmitApply} from '../actions/apply.actions';
import {UserState} from './user.state';
import {ApplyService} from '../services/apply.service';
import {catchError, takeUntil, tap} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs';
import {ApplicationModel} from '../models/application.model';

export interface ApplyStateModel {
  loading: boolean;
  application: ApplicationModel;
  hasError: boolean;
}

export const initialState: ApplyStateModel = {
  loading: false,
  application: null,
  hasError: false
};

@State<ApplyStateModel>({
  name: 'apply',
  defaults: initialState
})
export class ApplyState {
  constructor(private store: Store,
              private applyService: ApplyService,
              private actions: Actions) {
  }

  @Action(LoadApply)
  loadApply({patchState}: StateContext<ApplyStateModel>) {
    patchState({loading: true});
    const userId = this.store.selectSnapshot(UserState.userId);
    return this.applyService.load(0, userId)
      .pipe(
        takeUntil(this.actions.pipe(ofActionDispatched(ResetApply))),
        tap((application: ApplicationModel) => {
          patchState({
            loading: false,
            application
          });
        }),
        catchError(() => of(patchState({loading: false})))
      );
  }

  @Action(ResetApply)
  resetAplly({setState}: StateContext<ApplyStateModel>) {
    return setState(initialState);
  }

  @Action(SubmitApply)
  submitApply({getState, patchState}: StateContext<ApplyStateModel>, {payload}: SubmitApply) {
    patchState({
      loading: true,
      hasError: false
    });
    const state = getState();
    let req: Observable<boolean>;
    if (state.application) {
      const application: ApplicationModel = {
        ...state.application,
        ...payload
      } as ApplicationModel;
      req = this.applyService.update(application);
    } else {
      const application: ApplicationModel = {
        ...payload,
        userId: this.store.selectSnapshot(UserState.userId),
        propertyId: 0
      } as ApplicationModel;
      req = this.applyService.create(application);
    }
    return req.pipe(
      tap(() => patchState({loading: false})),
      catchError(() => of(patchState({
        loading: false,
        hasError: true
      })))
    );
  }

  @Selector()
  static loading(state: ApplyStateModel) {
    return state.loading;
  }

  @Selector()
  static application(state: ApplyStateModel) {
    return state.application;
  }

  @Selector()
  static hasError(state: ApplyStateModel) {
    return state.hasError;
  }
}
