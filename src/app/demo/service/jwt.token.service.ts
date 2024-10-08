import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'
import { LocalStorageService } from './local.storage.service';

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  jwtToken: string;
  decodedToken: { [key: string]: string };

  constructor(private localStorageService: LocalStorageService) {
    this.jwtToken = this.localStorageService.getUserToken();
    this.decodeToken();
  }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
      this.decodeToken();
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
    }
  }

  getDecodeToken() {
    return jwtDecode(this.jwtToken);
  }

  // getUser() {
  //   this.decodeToken();
  //   return this.decodedToken ? this.decodedToken.displayname : null;
  // }

  getEmailId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['email'] : null;
  }

  getRole() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;
  }

  getUserTenant() {
    return this.decodedToken ? this.decodedToken['tenant'] : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: any = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
