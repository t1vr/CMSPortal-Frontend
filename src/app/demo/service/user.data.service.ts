import { Injectable } from '@angular/core';
import { CreateUserRequest, UserItem } from './user.service';
import { HttpClient } from '@angular/common/http';
import { BaseDataService } from './base.data.service';
import { UserApiConstants } from 'src/app/constants/api.constants';
import { BaseResponse } from '../../models/tenant.model';
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

}
