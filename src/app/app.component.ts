import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from './state/user.state';
import {Observable} from 'rxjs';
import {UserModel} from './models/user.model';
import {CheckUser} from './actions/user.actions';
import {Logout} from './actions/auth.actions';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoginComponent} from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Select(UserState.user) user: Observable<UserModel>;
  @Select(UserState.userName) userName: Observable<string>;
  @Select(UserState.loading) userLoading: Observable<boolean>;
  @Select(UserState.loggedIn) userLoggedIn: Observable<boolean>;

  constructor(private store: Store, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.dispatch(new CheckUser());
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  openLogin() {
    const config: MatDialogConfig = {
      width: '300px'
    } as MatDialogConfig;
    this.dialog.open(LoginComponent, config);
  }
}
