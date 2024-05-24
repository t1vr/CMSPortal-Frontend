import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local.storage.service";
import { JWTTokenService } from "./jwt.token.service";
import { AuthService } from "./auth.service";
import { CourseService } from "./course.service";
import { CurrentUserService } from "./current.user.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService,
    private authService: AuthService,
    private courseService: CourseService,
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

  async isCurrentUserAuthorizedToEditCourse(courseRevisionId) {
    let abc = await this.courseService.getCourseById(courseRevisionId).toPromise();
    console.log(abc);
    // await this.courseService.getCourseById(courseRevisionId).subscribe((x) => {
    //   if (x.data) {
    //     let currentUser = this.currenUserService.getCurrentUser();

    //     if (currentUser.id === x.data.authorId)
    //       return true;
    //     return false;
    //   }
    // });

  }
}
