import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { CurrentUserService } from "./current.user.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private authService: AuthService,
    private currenUserService: CurrentUserService) {
  }

  hasRoles(roles: string[]) {
    if (!this.authService.isLoggedIn())
      return false;

    let userRoles = this.currenUserService.getRoles();

    let roleFound = false;

    for (const role of roles) {
      if (userRoles.includes(role)) {
        roleFound = true;
      }
    }

    return roleFound;
  }

  hasPermissions(permissions: string[]) {
    if (!this.authService.isLoggedIn())
      return false;

    let userPermissions = this.currenUserService.getPermissions();

    let permissionFound = false;

    for (const permission of permissions) {
      if (userPermissions.includes(permission)) {
        permissionFound = true;
      }
    }

    return permissionFound;
  }

  // async isCurrentUserAuthorizedToEditCourse(courseRevisionId) {
  //   let abc = await this.courseService.getCourseById(courseRevisionId).toPromise();
  //   console.log(abc);
  //   // await this.courseService.getCourseById(courseRevisionId).subscribe((x) => {
  //   //   if (x.data) {
  //   //     let currentUser = this.currenUserService.getCurrentUser();

  //   //     if (currentUser.id === x.data.authorId)
  //   //       return true;
  //   //     return false;
  //   //   }
  //   // });

  // }
}
