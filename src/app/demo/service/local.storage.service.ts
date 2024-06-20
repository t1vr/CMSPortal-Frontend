import { Injectable } from '@angular/core';
import { CurrentUserKey, TokenKey } from 'src/app/constants/constants';
import { AppUser } from 'src/app/models/tenant.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  setUserPermissions(permissions: string[]): void {
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  getUserPermissions(): string[] {
    return JSON.parse(localStorage.getItem('permissions'));
  }

  setTenantIdentifier(tenantIdentifier: string): void {
    localStorage.setItem('tenantIdentifier', tenantIdentifier);
  }

  getTenantIdentifier(): string {
    return localStorage.getItem('tenantIdentifier') as string;
  }

  setUserToken(token: string) {
    localStorage.setItem(TokenKey, token);
  }

  getUserToken(): string {
    return localStorage.getItem(TokenKey) as string;
  }

  setUser(user: AppUser) {
    localStorage.setItem(CurrentUserKey, JSON.stringify(user));
  }

  getUser(): AppUser {
    return JSON.parse(localStorage.getItem(CurrentUserKey));
  }

  clearProfile() {
    localStorage.removeItem('tenantIdentifier')
    localStorage.removeItem(TokenKey)
    localStorage.removeItem(CurrentUserKey)
    localStorage.removeItem('permissions')
  }

}
