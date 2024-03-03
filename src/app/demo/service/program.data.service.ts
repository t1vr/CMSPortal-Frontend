import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProgramApiConstants, TenantApiConstants } from "src/app/constants/api.constants";
import { BaseResponse, Tenant, SignUpTenantRequestModel, SignUpTenantResponseModel, ProgramItem, CreateProgramRequest } from "src/app/models/tenant.model";
import { BaseDataService } from "./base.data.service";

@Injectable({ providedIn: "root" })
export class ProgramDataService extends BaseDataService {


  constructor(private httpClient: HttpClient) {
    super();
  }

  getAllPrograms(): Observable<BaseResponse<ProgramItem[]>> {
    return this.httpClient.get<BaseResponse<ProgramItem[]>>(
      this.getFullApiUrl(ProgramApiConstants.PROGRAM_MODULE, ProgramApiConstants.GET_ALL_ENDPOINT),
      this.getHttpOptions(false, false, false)
    );
  }

  createProgram(createProgramRequest: CreateProgramRequest): Observable<BaseResponse<ProgramItem>> {
    return this.httpClient.post<BaseResponse<ProgramItem>>(
      this.getFullApiUrl(ProgramApiConstants.PROGRAM_MODULE, ProgramApiConstants.CREATE_ENDPOINT),
      createProgramRequest,
      this.getHttpOptions(false, true, false));
  }

  signUpTenant(signUpTenantRequestModel: SignUpTenantRequestModel): Observable<SignUpTenantResponseModel> {
    return this.httpClient.post<SignUpTenantRequestModel>(
      this.getFullApiUrl(TenantApiConstants.TENANT_MODULE, TenantApiConstants.CREATE_ENDPOINT),
      signUpTenantRequestModel,
      this.getHttpOptions(false, true, false));
  }
}

