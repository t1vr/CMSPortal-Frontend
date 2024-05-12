import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse, CurriculumItem, CreateCurriculumRequest } from 'src/app/models/tenant.model';
import { UserDataService } from './user.data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userDataService: UserDataService) { }

  getUserById(userId: number): Observable<BaseResponse<UserItem>> {
    return this.userDataService.getUserById(userId);
  }


  getAllUsers(): Observable<BaseResponse<UserItem[]>> {
    return this.userDataService.getAllUsers();
  }

  createUser(createUserRequest: CreateUserRequest): Observable<BaseResponse<UserItem>> {
    return this.userDataService.createUser(createUserRequest);
  }

}


export interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  tenantId: string;
  imageUrl: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
}

