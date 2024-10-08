import { BaseResponse, SignUpTenantRequestModel, SignUpTenantResponseModel, Tenant } from 'src/app/models/tenant.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseDataService } from "./base.data.service";
import { Observable } from "rxjs";
import { TenantApiConstants } from 'src/app/constants/api.constants';
import { TenantUpdateRequest } from '../components/super-admin/tenant-upsert/tenant-upsert.component';

@Injectable({ providedIn: "root" })
export class TenantDataService extends BaseDataService {


  constructor(private httpClient: HttpClient) {
    super();
  }

  getAllTenants() {
    return this.httpClient.get<BaseResponse<Tenant[]>>(
      this.getFullApiUrl(TenantApiConstants.TENANT_MODULE, TenantApiConstants.GET_ALL_ENDPOINT),
      this.getHttpOptions(false, false, false)
    );
  }


  getTenantByIdentifier(tenantIdentifier: string): Observable<BaseResponse<Tenant>> {
    return this.httpClient.get<BaseResponse<Tenant>>(
      this.getFullApiUrl(TenantApiConstants.TENANT_MODULE, TenantApiConstants.GET_BY_ID_ENDPOINT) + tenantIdentifier,
      this.getHttpOptions(false, true, false)
    );
  }

  signUpTenant(signUpTenantRequestModel: SignUpTenantRequestModel): Observable<SignUpTenantResponseModel> {
    return this.httpClient.post<SignUpTenantResponseModel>(
      this.getFullApiUrl(TenantApiConstants.TENANT_MODULE, TenantApiConstants.CREATE_ENDPOINT),
      signUpTenantRequestModel,
      this.getHttpOptions(false, true, false));
  }

  updateTenant(id: string, tenantUpdateRequest: TenantUpdateRequest): Observable<string> {
    return this.httpClient.put<string>(
      this.getFullApiUrl(TenantApiConstants.TENANT_MODULE, TenantApiConstants.UPDATE_ENDPOINT + id),
      tenantUpdateRequest,
      this.getHttpOptions(false, true, false));
  }
}

