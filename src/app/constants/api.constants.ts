export class AppRouteUrlConstant {
  public static readonly ROUTE_DEVIDER = "/";
  public static readonly ROUTE_API = "api";
}

export class TenantApiConstants {
  public static readonly TENANT_MODULE = "tenants"
  public static readonly CREATE_ENDPOINT = "";
  public static readonly GET_BY_ID_ENDPOINT = "";
}

export class AuthApiConstants {
  public static readonly AUTH_MODULE = "token"
  public static readonly LOGIN = "login";
  public static readonly SIGNUP = "";
  public static readonly GET_BY_ID_ENDPOINT = "";
}

export class ProgramApiConstants {
  public static readonly PROGRAM_MODULE = "programs"
  public static readonly CREATE_ENDPOINT = "";
  public static readonly UPDATE_ENDPOINT = "";
  public static readonly GET_ALL_ENDPOINT = "";
  public static readonly GET_BY_ID_ENDPOINT = "";
}

export class CourseApiConstants {
  public static readonly COURSE_MODULE = "course"
  public static readonly CREATE_ENDPOINT = "";
  public static readonly UPDATE_ENDPOINT = "";
  public static readonly DELETE_ENDPOINT = "";
  public static readonly GET_ALL_ENDPOINT = "";
  public static readonly GET_ALL_COURSE_REVISIONS_BY_COURSE_ID_ENDPOINT = "revisions/";
  public static readonly GET_BY_ID_ENDPOINT = "";
  public static readonly REVISE_ENDPOINT = "revise/";
  public static readonly ADD_TO_CURRICULUM_ENDPOINT = "add-to-curriculum/";
  public static readonly DELETE_BY_ID_ENDPOINT = "";

}

export class CurriculumApiConstants {
  public static readonly CURRICULUM_MODULE = "curriculum"
  public static readonly CREATE_ENDPOINT = "";
  public static readonly UPDATE_ENDPOINT = "";
  public static readonly DELETE_ENDPOINT = "";
  public static readonly GET_ALL_ENDPOINT = "";
  public static readonly GET_BY_ID_ENDPOINT = "";
  public static readonly ADD_TO_CURRICULUM_ENDPOINT = "add-to-curriculum/";

}
