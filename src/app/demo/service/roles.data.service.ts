import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleItem } from './roles.service';
import { ProgramApiConstants, RoleApiConstants } from 'src/app/constants/api.constants';
import { BaseDataService } from './base.data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesDataService extends BaseDataService {
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
