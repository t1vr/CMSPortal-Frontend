import { Injectable } from '@angular/core';
import { RolesDataService } from './roles.data.service';
import { Observable } from 'rxjs';
import { CMSPermission, UpdateRolePermissionsRequest } from '../components/access-control-manager/access-control-manager.component';

@Injectable({
  providedIn: 'root'
})
export class RolesService {


  constructor(private rolesDataService: RolesDataService) { }
  getAllPermissions(): Observable<CMSPermission[]> {
    return this.rolesDataService.getAllPermissions();
  }
  GetRoleByIdWithPermissions(roleId: string): Observable<RoleItem> {
    return this.rolesDataService.getRoleByIdWithPermissions(roleId);
  }
  getAllRoles(): Observable<RoleItem[]> {
    return this.rolesDataService.getAllRoles();
  }
  updateRolePermissions(roleId: string, request: UpdateRolePermissionsRequest) {
    return this.rolesDataService.updateRolePermissions(roleId, request);
  }
}


export interface RoleItem {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}
