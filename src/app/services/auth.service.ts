import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserModel} from '../models/user.model';
import {API_ROOT} from '../constants/api.const';
import {catchError, map} from 'rxjs/internal/operators';
import {AuthFormModel} from '../models/auth-form.model';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  static logout() {
    localStorage.clear();
  }

  private static saveToken(token: number) {
    localStorage.setItem('user_id', token.toString());
  }

  login({email, password}: AuthFormModel): Observable<number> {
    return this.http.get<UserModel[]>(`${API_ROOT}/users`)
      .pipe(
        map((users: UserModel[]) => {
          if (!users.length) {
            throwError({});
          }

          AuthService.saveToken(users[0].id);
          return users[0].id;
        })
      );
  }

  me(): Observable<UserModel> {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      return throwError({});
    }
    return this.http.get<UserModel>(`${API_ROOT}/users/${userId}`).pipe(
      catchError(() => {
        AuthService.logout();
        return throwError({});
      })
    );
  }
}
