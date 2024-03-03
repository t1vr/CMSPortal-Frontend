import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseResponse, CreateProgramRequest, LoginRequestModel, LoginResponseModel, ProgramItem } from "src/app/models/tenant.model";
import { AuthDataService } from "./auth.data.service";
import { LocalStorageService } from "./local.storage.service";
import { ProgramDataService } from "./program.data.service";
import { ProgramApiConstants } from "src/app/constants/api.constants";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private programDataService: ProgramDataService) { }

  getAllPrograms(): Observable<BaseResponse<ProgramItem[]>> {
    return this.programDataService.getAllPrograms();
  }

  createProgram(createProgramRequest: CreateProgramRequest): Observable<BaseResponse<ProgramItem>> {
    return this.programDataService.createProgram(createProgramRequest);
  }

}
