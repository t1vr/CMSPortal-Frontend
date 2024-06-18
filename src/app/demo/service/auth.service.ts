import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthDataService } from './auth.data.service';
import { BaseResponse, LoginRequestModel, LoginResponseModel } from 'src/app/models/tenant.model';
import { LocalStorageService } from './local.storage.service';
import { JWTTokenService } from './jwt.token.service';
import { ResetPasswordRequest } from '../components/auth/reset-password/reset-password.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  resetPassword(request: ResetPasswordRequest) {
    return this.authDataService.resetPassword(request)
  }


  constructor(private authDataService: AuthDataService,
    private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService) { }

  login(loginRequestModel: LoginRequestModel): Observable<BaseResponse<LoginResponseModel>> {
    this.localStorageService.setTenantIdentifier(loginRequestModel.tenantIdentifier);
    return this.authDataService.login(loginRequestModel).pipe(tap(x => {
      this.jwtTokenService.setToken(x.data.token);
      this.localStorageService.setUserToken(x.data.token);
      this.localStorageService.setUser(x.data.userResponse);
    }));
  }

  getPasswordResetToken(userId: string, email: string, tenantKey: string) {
    return this.authDataService.getPasswordResetToken(userId, email, tenantKey);
  }
  confirmEmail(userId: string, code: string, tenantKey: string) {
    return this.authDataService.confirmEmail(userId, code, tenantKey);
  }


  isLoggedIn() {
    let x = !this.jwtTokenService.isTokenExpired();
    return x;
  }

}
