import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Login, Logout} from '../actions/auth.actions';
import {AuthService} from '../services/auth.service';
import {catchError, switchMap, tap} from 'rxjs/internal/operators';
import {CheckUser} from '../actions/user.actions';
import {EMPTY} from 'rxjs';

export interface AuthStateModel {
  loading: boolean;
  hasError: boolean;
}

export const initialState: AuthStateModel = {
  loading: false,
  hasError: false
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: initialState
})
export class AuthState {
  constructor(private authService: AuthService) {
  }

  @Action(Login)
  login({setState, dispatch}: StateContext<AuthStateModel>, {payload}: Login) {
    setState({
      loading: true,
      hasError: false
    });
    return this.authService.login(payload)
      .pipe(
        switchMap(() => dispatch(new CheckUser())),
        tap(() => setState(initialState)),
        catchError(() => {
          setState({
            loading: false,
            hasError: true
          });
          return EMPTY;
        })
      );
  }

  @Action(Logout)
  logout({dispatch}: StateContext<AuthStateModel>) {
    AuthService.logout();
    return dispatch(new CheckUser());
  }

  @Selector()
  static loading(state: AuthStateModel) {
    return state.loading;
  }
}
