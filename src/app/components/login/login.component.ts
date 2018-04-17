import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {Login} from '../../actions/auth.actions';
import {MatDialogRef} from '@angular/material';
import {AuthState} from '../../state/auth.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Select(AuthState.loading) loading: Observable<boolean>;
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, public dialogRef: MatDialogRef<LoginComponent>) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.store
        .dispatch(new Login(this.form.value))
        .subscribe(() => {
          const {user} = this.store.snapshot();
          if (user.loggedIn) {
            this.dialogRef.close();
          }
        });
    }
  }
}
