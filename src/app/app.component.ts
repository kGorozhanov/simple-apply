import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from './state/user.state';
import {Observable} from 'rxjs';
import {UserModel} from './models/user.model';
import {CheckUser} from './actions/user.actions';
import {Logout} from './actions/auth.actions';
import {AuthDialogService} from './services/auth-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @Select(UserState.user) user: Observable<UserModel>;
  @Select(UserState.userName) userName: Observable<string>;
  @Select(UserState.loading) userLoading: Observable<boolean>;
  @Select(UserState.loggedIn) userLoggedIn: Observable<boolean>;

  constructor(private store: Store, private authDialog: AuthDialogService) {
  }

  ngOnInit() {
    this.store.dispatch(new CheckUser());
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  openLogin() {
    this.authDialog.show();
  }
}
