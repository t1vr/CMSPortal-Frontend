import { FormControl } from "@angular/forms";

//Tenant
export class SignUpTenantRequestModel {
  identifier!: string;
  name!: string;
  adminEmail!: string;
  password!: string;
}

export class SignUpTenantResponseModel {
  identifier!: string;
  name!: string;
  adminEmail!: string;
  password!: string;
}


export interface LoginRequestModel {
  tenantIdentifier: string;
  email: string;
  password: string;
}

export interface LoginResponseModel {
  userResponse: AppUser
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
}

export interface AppUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  isActive: string;
  roles: string[];
  tenantId: string;
}


export interface BaseResponse<T> {
  message: string;
  statusCode: number;
  succeeded: boolean;
  data: T;
}


export interface BaseAuditableResponse {
  createdBy: Date;
  createdAt: Date;
  lastModifiedBy: Date;
  lastModifiedAt: Date;
}

export interface Tenant extends BaseAuditableResponse {
  id: string;
  identifier: string;
  name: string;
  description: string;
  adminEmail: string;
  isActive: boolean;
  validUpTo: Date;
}


export class ProgramItem {
  id: number;
  name: string;
  description: string;
}


export class CreateProgramRequest {
  name: string;
  description: string;
}


export interface CourseForm {
  title: FormControl<string>;
  creditHour: FormControl<number>;
  description: FormControl<string>;
  courseCode: FormControl<string>;
  curriculumId?: FormControl<number>;
}

export interface CourseItem {
  id: number;
  courseCode: string;
  title: string;
  creditHour: number;
  description: string;
  courseId: number;
  curriculumId: number;
  reasonForRevision: string;
}

export interface CreateCourseRequest {
  courseCode: string;
  name: string;
  creditHour: number;
  semester: string;
}

export interface UpdateCourseRequest {
  courseCode: string;
  title: string;
  creditHour: number;
  semester: string;
}


export class CurriculumItem {
  id: number;
  title: string;
  description: string;
  programs: ProgramItem[];
  EffectiveFromYear: Date;
  EffectiveTillYear: Date;
}

export class CreateCurriculumRequest {
  title: string;
  description: string;
  programIds: number[];
  effectiveFromYear: Date;
  effectiveTillYear: Date;
}

export interface CurriculumForm {
  title: FormControl<string>;
  description: FormControl<string>;
  programIds: FormControl<number[]>;
  duration: FormControl<Date[]>;
}
