import { Injectable } from '@angular/core';
import { LocalStorageService } from './local.storage.service';
import { JWTTokenService } from './jwt.token.service';
import { AppUser } from 'src/app/models/tenant.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  logOut() {
    this.localStorageService.clearProfile();
    this.router.navigate(['/auth/login'])
  }

  constructor(private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService,
    private router: Router
  ) { }

  getCurrentUser(): AppUser {
    let appUser = this.localStorageService.getUser();
    appUser.fullName = appUser.firstName + ' ' + appUser.lastName
    return appUser;
  }

  getRoles(): string[] {
    let user = this.getCurrentUser();
    return user?.roles;
  }

  isLoggedIn() {

  }

}
