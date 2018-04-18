import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatInputModule, MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import {APP_STATE} from './state/index';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ShowPropertyComponent} from './components/show-property/show-property.component';
import {ApplyComponent} from './components/apply/apply.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {AuthDialogService} from './services/auth-dialog.service';
import {ApplyDialogService} from './services/apply-dialog.service';
import {ApplyService} from './services/apply.service';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ShowPropertyComponent,
    ApplyComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot(APP_STATE),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [
    LoginComponent,
    ApplyComponent
  ],
  providers: [
    AuthService,
    AuthDialogService,
    ApplyService,
    ApplyDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
