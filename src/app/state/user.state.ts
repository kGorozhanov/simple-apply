import {UserModel, UserType} from '../models/user.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {CheckUser} from '../actions/user.actions';
import {AuthService} from '../services/auth.service';
import {catchError, tap} from 'rxjs/internal/operators';
import {of} from 'rxjs';

export interface UserStateModel {
  loading: boolean;
  loggedIn: boolean;
  data: UserModel;
}

export const initialState: UserStateModel = {
  loading: false,
  loggedIn: false,
  data: null
};

@State<UserStateModel>({
  name: 'user',
  defaults: initialState
})
export class UserState {
  constructor(private authService: AuthService) {
  }

  @Action(CheckUser)
  checkUser({setState, patchState}: StateContext<UserStateModel>) {
    patchState({loading: true});
    return this.authService.me()
      .pipe(
        tap(user => setState({
          loading: false,
          loggedIn: true,
          data: user
        })),
        catchError(() => of(setState(initialState)))
      );
  }


  /**
   *
   * SELECTORS
   *
   */

  @Selector()
  static user(state: UserStateModel): UserModel {
    return state.data;
  }

  @Selector()
  static userName(state: UserStateModel): string {
    return state.data && `${state.data.firstName} ${state.data.lastName}`;
  }

  @Selector()
  static loading(state: UserStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static loggedIn(state: UserStateModel): boolean {
    return state.loggedIn;
  }

  @Selector()
  static userType(state: UserStateModel): string {
    return state.data && state.data.type;
  }

  @Selector()
  static userId(state: UserStateModel): number {
    return state.data && state.data.id;
  }
}
