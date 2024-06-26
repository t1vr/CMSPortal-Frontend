import { FormControl } from "@angular/forms";

//Tenant
export class SignUpTenantRequestModel {
  id: string;
  name!: string;
  adminEmail!: string;
  description: string;
  isActive: boolean;
}

export class SignUpTenantResponseModel {
  identifier!: string;
  name!: string;
  adminEmail!: string;
  password!: string;
  description: string;
  isActive: string;
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

export enum CourseCategory {
  InternDisciplinary,
  Core
}

export interface CourseForm {
  title: FormControl<string>;
  creditHour: FormControl<number>;
  description: FormControl<string>;
  courseCode: FormControl<string>;
  curriculumId?: FormControl<number>;
  authorId: FormControl<string>;
  semesterOffered: FormControl<number>;
  courseDisciplineId: FormControl<number>;
  courseCategory: FormControl<CourseCategory>;
  courseType: FormControl<CourseType>;
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
  reviewerId: string;
  reviewerName: string;
  reviewer: UserItem;
  courseRevisionStatus: CourseRevisionStatus;
  semesterOffered: number;
  semesterName: string;
  courseCategory: CourseCategory;
  courseDisciplineId: number;
  courseDiscipline: CourseDisciplineItem;
  courseType: CourseType
}

export const allSemesters: any[] = [
  { label: '1st Year 1st Semester', value: 1 },
  { label: '1st Year 2nd Semester', value: 2 },
  { label: '2nd Year 1st Semester', value: 3 },
  { label: '2nd Year 2nd Semester', value: 4 },
  { label: '3rd Year 1st Semester', value: 5 },
  { label: '3rd Year 2nd Semester', value: 6 },
  { label: '4th Year 1st Semester', value: 7 },
  { label: '4th Year 2nd Semester', value: 8 }
]

export enum CourseType {
  Theory,
  Lab,
  Viva,
  Thesis,
  Project
}


export interface CreateCourseRequest {
  title: string;
  courseCode: string | null;
  creditHour: number | null;
  semesterOffered: number | null;
  authorId: string | null;
  description: string | null;
  curriculumId: number;
}

export interface UpdateCourseRequest {
  title: string;
  courseCode: string;
  creditHour: number;
  semesterOffered: number;
  authorId: string;
  description: string;
  courseDisciplineId: number;
  courseCategory: CourseCategory;
  courseType: CourseType;
}

export class CurriculumItem {
  id: number;
  title: string;
  description: string;
  programResponses: ProgramItem[];
  effectiveFromYear: Date;
  effectiveTillYear: Date;
  courseResponses: CourseItem[];
}

export class CreateCurriculumRequest {
  title: string;
  description: string;
  programIds: number[];
  effectiveFromYear: Date;
  effectiveTillYear: Date;
}

export class UpdateCurriculumRequest {
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


export interface CourseDisciplineItem {
  id: number;
  title: string;
}

export interface CreateCourseDisciplineRequest {
  title: string;
  curriculumId: number | null;
}

export interface UpdateCourseDisciplineRequest {
  title: string;
}


export enum CourseRevisionStatus {
  Unassigned,
  ToDo,
  InProgress,
  UnderReview,
  Approved,
  Rejected
}

export interface UpdateCourseRevisionStatusRequest {
  courseRevisionStatus: CourseRevisionStatus;
}

export interface AssignReviewersForCourseRevisionRequest {
  reviewerIds: string[];
}
