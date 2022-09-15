import { UserModel } from './../Model/user.model';
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

  public getUser = (userId: Number): Observable<UserModel> => {
    return this.http.get<UserModel>(
      environment.apiUrl +
        actions.apiRelativeUrls.getUser.replace('{0}', userId.toString()),
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

  public createUser = (user: UserModel): Observable<ApiResponse> => {
    return this.http.post<ApiResponse>(
      environment.apiUrl + actions.apiRelativeUrls.postUser,
      user
    );
  };

  public editUser = (user: UserModel): Observable<ApiResponse> => {
    return this.http.patch<ApiResponse>(
      environment.apiUrl + actions.apiRelativeUrls.patchUser,
      user
    );
  };
}
