import { Injectable } from '@angular/core';
import { RolesDataService } from './roles.data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  GetRoleByIdWithPermissions(roleId:string) : Observable<RoleItem> {
    return this.rolesDataService.getRoleByIdWithPermissions(roleId);
  }
  getAllRoles(): Observable<RoleItem[]> {
    return this.rolesDataService.getAllRoles();
  }

  constructor(private rolesDataService: RolesDataService) { }

}


export interface RoleItem {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}
