import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TenantService } from 'src/app/demo/service/tenant.service';
import { UserService } from 'src/app/demo/service/user.service';
import { CreateUserRequest, FacultyForm, SignUpTenantRequestModel, Tenant, UpdateUserRequest } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-tenant-upsert',
  templateUrl: './tenant-upsert.component.html',
  styleUrls: ['./tenant-upsert.component.css']
})
export class TenantUpsertComponent implements OnInit {
  tenant: Tenant;
  tenantForm: FormGroup<TenantForm>;

  constructor(private fb: FormBuilder,
    private tenantService: TenantService,
    public messageService: MessageService,
    public dialogConfig: DynamicDialogConfig,
    private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.tenant = this.dialogConfig.data;
    this.initForm();
    if (this.tenant) {
      let data = {
        identifier: this.tenant.identifier,
        name: this.tenant.name,
        description: this.tenant.description,
        adminEmail: this.tenant.adminEmail,
        isActive: this.tenant.isActive
      }
      this.tenantForm.setValue(data);
    }
  }

  initForm(): void {
    this.tenantForm = this.fb.group<TenantForm>({
      identifier: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      adminEmail: new FormControl(null, Validators.required),
      isActive: new FormControl(null)
    });
  }

  isLoading = false;
  onSubmitUserForm() {
    this.isLoading = true;
    if (!this.tenant) {
      let signUpTenantRequestModel: SignUpTenantRequestModel = {
        adminEmail: this.tenantForm.value.adminEmail,
        name: this.tenantForm.value.name,
        id: this.tenantForm.value.identifier,
        description: this.tenantForm.value.description,
        isActive: this.tenantForm.value.isActive,
      }

      this.tenantService.signUpTenant(signUpTenantRequestModel).subscribe(x => {
        if (x) {
          this.isLoading = false;
          this.messageService.add({ severity: 'info', summary: 'Tenant created successfully', life: 3000 });
          return;
        }
      },
        () => {
          this.isLoading = false;

        })
    }
    else {
      let tenantUpdateRequest: TenantUpdateRequest = {
        id: this.tenantForm.value.identifier,
        name: this.tenantForm.value.name,
        adminEmail: this.tenantForm.value.adminEmail,
        description: this.tenantForm.value.description,
        isActive: this.tenantForm.value.isActive,
      }

      this.tenantService.updateTenant(this.tenant.id, tenantUpdateRequest).subscribe(x => {
        if (x) {
          this.isLoading = false;
          this.closeModal();
          this.messageService.add({ severity: 'info', summary: 'Tenant updated successfully', life: 1000 });
          return;
        }
      },
        () => {
          this.isLoading = false;

        })
    }
  }

  closeModal() {
    this.ref.close();
  }
}


export class TenantForm {
  identifier: FormControl<string>;
  name: FormControl<string>;
  description: FormControl<string>;
  adminEmail: FormControl<string>;
  isActive: FormControl<boolean>;
}

export interface TenantUpdateRequest {
  id: string;
  name: string;
  adminEmail: string;
  description: string;
  isActive: boolean;
}
