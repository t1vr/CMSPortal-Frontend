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
  userResponse:AppUser
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
