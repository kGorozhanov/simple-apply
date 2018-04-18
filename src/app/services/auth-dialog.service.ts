import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {LoginComponent} from '../components/login/login.component';

@Injectable()
export class AuthDialogService {
  private config: MatDialogConfig = {
    width: '300px'
  } as MatDialogConfig;

  constructor(private dialog: MatDialog) {
  }

  show(): MatDialogRef<LoginComponent> {
    return this.dialog.open(LoginComponent, this.config);
  }
}
