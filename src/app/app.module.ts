import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {APP_STATE} from './state/index';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    NgxsModule.forRoot(APP_STATE),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule
  ],
  entryComponents: [LoginComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
