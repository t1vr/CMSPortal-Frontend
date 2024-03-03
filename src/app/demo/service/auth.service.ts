import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthDataService } from './auth.data.service';
import { LoginRequestModel, LoginResponseModel, SignUpTenantRequestModel, SignUpTenantResponseModel } from 'src/app/models/tenant.model';
import { LocalStorageService } from './local.storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authDataService: AuthDataService,
    private localStorageService: LocalStorageService) { }

  login(loginRequestModel: LoginRequestModel): Observable<LoginResponseModel> {
    this.localStorageService.setTenantIdentifier(loginRequestModel.tenantIdentifier);
    return this.authDataService.login(loginRequestModel).pipe(tap(x => {
      this.localStorageService.setUserToken(x.token);
    }));
  }

}
