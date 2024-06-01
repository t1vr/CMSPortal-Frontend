import { FormControl } from "@angular/forms";
import { CourseRevisionStatus } from "../demo/components/course-manager/course-details/course-details.component";

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
  fullName: string;
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

export interface Tenant {
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
  authorId: FormControl<string>;
  semesterOffered: FormControl<number>;
}

export interface CourseItem extends BaseAuditableResponse {
  id: number;
  courseCode: string;
  title: string;
  creditHour: number;
  description: string;
  courseId: number;
  curriculumId: number;
  reasonForRevision: string;
  authorId: string;
  authorName: string;
  author: UserItem;
  courseRevisionStatus: CourseRevisionStatus;
  semesterOffered: number;
}

export interface CreateCourseRequest {
  title: string;
  courseCode: string;
  creditHour: number;
  semesterOffered: number;
  authorId: string;
  description: string;
  curriculumId: number;
}

export interface UpdateCourseRequest {
  title: string;
  courseCode: string;
  creditHour: number;
  semesterOffered: number;
  authorId: string;
  description: string;
}

export class CurriculumItem {
  id: number;
  title: string;
  description: string;
  programResponses: ProgramItem[];
  EffectiveFromYear: Date;
  EffectiveTillYear: Date;
  courseResponses: CourseItem[];
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

export interface FacultyForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  designation: FormControl<string>;
  phoneNumber: FormControl<string>;
  roles: FormControl<string[]>;
}



export class Role {
  static Admin = 'Admin';
  static Faculty = 'Faculty';
}

export var rolesData = [
  {
    name: Role.Admin,
    value: Role.Admin,
  },
  {
    name: Role.Faculty,
    value: Role.Faculty,
  },
]

export class Designation {
  static Professor = 'Professor';
  static AssociateProfessor = 'Associate Professor';
  static AssistantProfessor = 'Assistant Professor';
  static Lecturer = 'Lecturer';
}


export var designationsData = [
  {
    name: Designation.Professor,
    value: Designation.Professor,
  },
  {
    name: Designation.AssociateProfessor,
    value: Designation.AssociateProfessor,
  },
  {
    name: Designation.AssistantProfessor,
    value: Designation.AssistantProfessor,
  },
  {
    name: Designation.Lecturer,
    value: Designation.Lecturer,
  }
]



export interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  isActive: boolean;
  tenantId: string;
  imageUrl: string;
  designation: string;
  phoneNumber: string;
  roles: string[];
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  phoneNumber: string;
  roles: string[];
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  phoneNumber: string;
  roles: string[];
}
