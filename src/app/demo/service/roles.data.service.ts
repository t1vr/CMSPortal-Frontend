import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleItem } from './roles.service';
import { ProgramApiConstants, RoleApiConstants } from 'src/app/constants/api.constants';
import { BaseDataService } from './base.data.service';
import { HttpClient } from '@angular/common/http';
import { CMSPermission, UpdateRolePermissionsRequest } from '../components/access-control-manager/access-control-manager.component';

@Injectable({
  providedIn: 'root'
})
export class RolesDataService extends BaseDataService {
  updateRolePermissions(roleId: string, request: UpdateRolePermissionsRequest): Observable<string> {
    return this.httpClient.put<string>(
      this.getFullApiUrl(RoleApiConstants.ROLE_MODULE, RoleApiConstants.UPDATE_ENDPOINT) + roleId + '/permissions',
      request,
      this.getHttpOptions(false, true, false)
    );
  }
  getAllPermissions(): Observable<CMSPermission[]> {
    return this.httpClient.get<CMSPermission[]>(
      this.getFullApiUrl(RoleApiConstants.ROLE_MODULE, RoleApiConstants.ALL_PERMISSIONS_ENDPOINT),
      this.getHttpOptions(false, true, false)
    );
  }
  getRoleByIdWithPermissions(roleId: string): Observable<RoleItem> {
    return this.httpClient.get<RoleItem>(
      this.getFullApiUrl(RoleApiConstants.ROLE_MODULE, RoleApiConstants.GET_BY_ID_ENDPOINT) + roleId + '/permissions',
      this.getHttpOptions(false, true, false)
    );
  }
  getAllRoles(): Observable<RoleItem[]> {
    return this.httpClient.get<RoleItem[]>(
      this.getFullApiUrl(RoleApiConstants.ROLE_MODULE, RoleApiConstants.GET_ALL_ENDPOINT),
      this.getHttpOptions(false, true, false)
    );
  }

  constructor(private httpClient: HttpClient) {
    super();
  }


}


