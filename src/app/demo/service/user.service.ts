import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BaseResponse, CreateUserRequest, UpdateUserRequest, UserItem } from 'src/app/models/tenant.model';
import { UserDataService } from './user.data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getPermissionsByUserId() {
    return this.userDataService.getPermissionsByUserId();
  }

  constructor(private userDataService: UserDataService) { }

  getUserById(userId: number): Observable<BaseResponse<UserItem>> {
    return this.userDataService.getUserById(userId);
  }

  getAllUsers(): Observable<BaseResponse<UserItem[]>> {
    return this.userDataService.getAllUsers().pipe(tap(x =>
      x.data?.map(user => {
        user.fullName = user.firstName + ' ' + user.lastName
        return user;
      })));
  }

  createUser(createUserRequest: CreateUserRequest): Observable<UserItem> {
    return this.userDataService.createUser(createUserRequest);
  }

  updateUserById(userId: string, request: UpdateUserRequest): Observable<BaseResponse<UserItem>> {
    return this.userDataService.updateUserById(userId, request);
  }

  deleteUserById(userId: any) {
    return this.userDataService.deleteUserById(userId);
  }

}


