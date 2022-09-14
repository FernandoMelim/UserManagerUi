import { ApiResponse } from './../../../response.mode';
import { environment } from './../../../../environments/environment';
import { actions } from './../users.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserList } from '../Model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  public getUsersList = (): Observable<UserList> => {
    return this.http.get<UserList>(
      environment.apiUrl + actions.apiRelativeUrls.getAllUsers,
      {}
    );
  };

  public deleteUser = (userId: Number): Observable<ApiResponse> => {
    return this.http.delete<ApiResponse>(
      environment.apiUrl +
        actions.apiRelativeUrls.deleteUser.replace('{0}', userId.toString()),
      {}
    );
  };
}
