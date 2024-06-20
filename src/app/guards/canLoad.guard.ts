import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Resolve, Route, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../demo/service/auth.service";
import { TokenKey } from "../constants/constants";
import { Observable, map } from "rxjs";
import { LocalStorageService } from '../demo/service/local.storage.service';
import { JWTTokenService } from "../demo/service/jwt.token.service";
import { CurrentUserService } from '../demo/service/current.user.service';
import { PermissionService } from "../demo/service/permission.service";
import { CourseService } from "../demo/service/course.service";

@Injectable({
  providedIn: "root",
})
export class CanLoadGuard implements CanLoad {
  constructor(private authService: AuthService,
    private router: Router
  ) { }

  canLoad(route: Route): boolean {
    let token = localStorage.getItem(TokenKey) as string;;
    if (token) {
      return true;
    } else {
      this.router.navigate(['/auth/login'])
      return false;
    }
  }
}


@Injectable({
  providedIn: "root",
})
export class CanActivateWithRoleGuard implements CanActivate {
  constructor(private authService: AuthService,
    private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService,
    private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route)

    let tenantInUrl = route.params['tenantIdentifier'];
    let userTenant = this.jwtTokenService.getUserTenant();

    let expectedRole = route.data['role'];
    let userRole = this.jwtTokenService.getRole();
    let token = localStorage.getItem(TokenKey) as string;
    if (token && tenantInUrl === userTenant && expectedRole.includes(userRole)) {
      return true;
    }

    this.router.navigate(['/auth/login'])
    return false;
  }
}



@Injectable({
  providedIn: 'root'
})
export class IsAuthorizedToEditResolverService implements Resolve<boolean> {

  constructor(private permissionService: PermissionService,
    private courseService: CourseService,
    private currentUserService: CurrentUserService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const requiredPermission = route.data['permission'];

    let currentUser = this.currentUserService.getCurrentUser();
    return this.courseService.getCourseById(route.params['courseId']).pipe(
      map(x => {
        if (x.data) {
          if (x.data.author?.id === currentUser.id)
            return true;
          else {
            this.router.navigate(['/auth/access']);
            return false;
          }
        }
        else {
          this.router.navigate(['/auth/access']);
          return false;
        }
      })
    )

    // return this.permissionService.isCurrentUserAuthorizedToEditCourse(requiredPermission).pipe(
    //   map(hasPermission => {
    //     if (hasPermission) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/access-denied']); // Redirect to an access denied page or login page
    //       return false;
    //     }
    //   }),
    //   catchError((error) => {
    //     this.router.navigate(['/access-denied']); // Redirect to an access denied page or login page
    //     return of(false);
    //   })
    // );
  }
}



