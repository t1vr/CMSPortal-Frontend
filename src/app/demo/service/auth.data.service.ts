import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseDataService } from "./base.data.service";
import { Observable } from "rxjs";
import { BaseResponse, LoginRequestModel, LoginResponseModel } from "src/app/models/tenant.model";
import { AuthApiConstants, TokenApiConstants } from "src/app/constants/api.constants";
import { ResetPasswordRequest } from "../components/auth/reset-password/reset-password.component";

@Injectable({ providedIn: "root" })
export class AuthDataService extends BaseDataService {



  constructor(private httpClient: HttpClient) {
    super();
  }

  login(loginRequestModel: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      this.getFullApiUrl(TokenApiConstants.Token_MODULE, TokenApiConstants.LOGIN),
      loginRequestModel,
      this.getHttpOptions(false, false, false));
  }

  confirmEmail(userId: string, code: string, tenantKey: string) {
    let params = new HttpParams()
      .set('userId', userId)
      .set('code', code)
      .set('tenantKey', tenantKey);

    return this.httpClient.get<BaseResponse<string>>(this.getFullApiUrl(AuthApiConstants.AUTH_MODULE, AuthApiConstants.CONFIRM_EMAIL), { params })
  }

  resetPassword(request: ResetPasswordRequest): Observable<BaseResponse<string>> {
    return this.httpClient.put<BaseResponse<string>>(
      this.getFullApiUrl(AuthApiConstants.AUTH_MODULE, AuthApiConstants.RESET_PASSWORD),
      request,
      this.getHttpOptions(false, false, false));
  }

  getPasswordResetToken(userId: string, email: string, tenantKey: string) {
    let params = new HttpParams()
      .set('userId', userId)
      .set('email', 'tanvir')
      .set('tenantId', tenantKey);

    return this.httpClient.get<BaseResponse<string>>(this.getFullApiUrl(AuthApiConstants.AUTH_MODULE, AuthApiConstants.GET_RESET_PASSWORD_TOKEN), { params })
  }
}

