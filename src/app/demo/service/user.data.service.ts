import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseDataService } from './base.data.service';
import { UserApiConstants } from 'src/app/constants/api.constants';
import { BaseResponse, CreateUserRequest, UpdateUserRequest, UserItem } from '../../models/tenant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends BaseDataService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  createUser(createUserRequest: CreateUserRequest): Observable<BaseResponse<UserItem>> {
    return this.httpClient.post<BaseResponse<UserItem>>(
      this.getFullApiUrl(UserApiConstants.USER_MODULE, UserApiConstants.CREATE_ENDPOINT),
      createUserRequest,
      this.getHttpOptions(false, true, false));
  }


  getAllUsers(): Observable<BaseResponse<UserItem[]>> {
    return this.httpClient.get<BaseResponse<UserItem[]>>(
      this.getFullApiUrl(UserApiConstants.USER_MODULE, UserApiConstants.GET_ALL_ENDPOINT),
      this.getHttpOptions(false, false, false)
    );
  }

  getUserById(userId: number): Observable<BaseResponse<UserItem>> {
    return this.httpClient.get<BaseResponse<UserItem>>(
      this.getFullApiUrl(UserApiConstants.USER_MODULE, UserApiConstants.GET_BY_ID_ENDPOINT + userId),
      this.getHttpOptions(false, false, false)
    );
  }

  updateUserById(userId: string, request: UpdateUserRequest): Observable<BaseResponse<UserItem>> {
    return this.httpClient.put<BaseResponse<UserItem>>(
      this.getFullApiUrl(UserApiConstants.USER_MODULE, UserApiConstants.UPDATE_ENDPOINT + userId),
      request,
      this.getHttpOptions(false, true, false));
  }

  deleteUserById(userId: any) {
    return this.httpClient.delete<BaseResponse<boolean>>(
      this.getFullApiUrl(UserApiConstants.USER_MODULE, UserApiConstants.DELETE_ENDPOINT + userId),
      this.getHttpOptions(false, false, false)
    );
  }

}
