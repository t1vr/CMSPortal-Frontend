import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseResponse, SignUpTenantRequestModel, SignUpTenantResponseModel, Tenant } from 'src/app/models/tenant.model';
import { LocalStorageService } from './local.storage.service';
import { TenantDataService } from './tenant.data.service';
import { TenantUpdateRequest } from '../components/super-admin/tenant-upsert/tenant-upsert.component';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  constructor(private tenantDataService: TenantDataService,
    private localStorageService: LocalStorageService) { }

  private tenantSubject$ = new BehaviorSubject<Tenant>(undefined);
  private tenantIdentifierSubject$ = new BehaviorSubject<string>(undefined);

  sendCurrentTenantIdentifier(tenantIdentifier: string) {
    this.tenantIdentifierSubject$.next(tenantIdentifier);
  }

  getCurrentTenantIdentifier(): Observable<string> {
    return this.tenantIdentifierSubject$.asObservable();
  }

  sendCurrentTenant(tenant: Tenant) {
    this.tenantSubject$.next(tenant);
  }

  clearMessages() {
    this.tenantSubject$.next(undefined);
  }

  getCurrentTenant(): Observable<Tenant> {
    return this.tenantSubject$.asObservable();
  }

  getTenantByIdentifier(tenantIdentifier: string): Observable<BaseResponse<Tenant>> {
    return this.tenantDataService.getTenantByIdentifier(tenantIdentifier);
  }

  signUpTenant(signupTenantRequestModel: SignUpTenantRequestModel): Observable<SignUpTenantResponseModel> {
    return this.tenantDataService.signUpTenant(signupTenantRequestModel);
  }

  updateTenant(id:string, tenantUpdateRequest: TenantUpdateRequest): Observable<string> {
    return this.tenantDataService.updateTenant(id,tenantUpdateRequest);
  }

  getAllTenants() {
    return this.tenantDataService.getAllTenants();
  }

}

