import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_ROOT} from '../constants/api.const';
import {Observable} from 'rxjs';
import {ApplicationModel} from '../models/application.model';
import {map, mapTo} from 'rxjs/internal/operators';

@Injectable()
export class ApplyService {
  constructor(private http: HttpClient) {
  }

  load(propertyId: number, userId: number): Observable<ApplicationModel> {
    return this.http.get<ApplicationModel>(`${API_ROOT}/applications?propertyId=${propertyId}&userId=${userId}`)
      .pipe(map(applications => applications[0]));
  }

  update(application: ApplicationModel) {
    return this.http.put(`${API_ROOT}/applications/${application.id}`, application)
      .pipe(mapTo(true));
  }

  create(application: ApplicationModel) {
    return this.http.post(`${API_ROOT}/applications`, application)
      .pipe(mapTo(true));
  }
}
