import {Routes} from '@angular/router';
import {ShowPropertyComponent} from './components/show-property/show-property.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ShowPropertyComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
