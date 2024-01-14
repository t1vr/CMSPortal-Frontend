import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseDataService } from "./base.data.service";
import { Observable } from "rxjs";
import { LoginRequestModel, LoginResponseModel } from "src/app/models/tenant.model";
import { AuthApiConstants } from "src/app/constants/api.constants";

@Injectable({ providedIn: "root" })
export class AuthDataService extends BaseDataService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  login(loginRequestModel: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      this.getFullApiUrl(AuthApiConstants.AUTH_MODULE, AuthApiConstants.LOGIN),
      loginRequestModel,
      this.getHttpOptions(false, false, false));
  }
}

