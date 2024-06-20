import { Component, OnInit } from '@angular/core';
import { RoleItem, RolesService } from '../../service/roles.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-access-control-manager',
  templateUrl: './access-control-manager.component.html',
  styleUrls: ['./access-control-manager.component.css'],
  providers: [MessageService]
})
export class AccessControlManagerComponent implements OnInit {

  isSaveBtnLoading = false;
  roles: RoleItem[] = [];
  permissions: CMSPermission[] = [];
  selectedRole: RoleItem;
  selectedPermissions: any[] = [];
  constructor(private rolesService: RolesService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.getAllRoles();
    this.getAllPermissions();
  }

  getAllPermissions() {
    this.rolesService.getAllPermissions().subscribe(
      (x) => {
        this.permissions = x;
      },
      () => { })
  }

  onSelectionChange(role: RoleItem) {
    if (!role) return;

    this.rolesService.GetRoleByIdWithPermissions(role.id).subscribe(
      (x) => {
        this.selectedPermissions = x.permissions;
      },
      () => { })
  }

  getAllRoles() {
    this.rolesService.getAllRoles().subscribe(x => {
      this.roles = x;
    },
      () => { })
  }

  isPermissionIntact = true;
  onChangePermission() {
    this.isPermissionIntact = false;
  }

  onClickSaveBtn() {
    this.isSaveBtnLoading = true;
    let request: UpdateRolePermissionsRequest = {
      roleId: this.selectedRole.id,
      permissions: this.selectedPermissions
    }
    this.rolesService.updateRolePermissions(request.roleId, request).subscribe(
      (x) => {
        this.isSaveBtnLoading = false;
        this.isPermissionIntact = true;
        this.messageService.add({ severity: 'info', summary: 'Permission updated', life: 3000 });
      },
      () => { this.isSaveBtnLoading = false; }
    )
  }
}


export interface CMSPermission {
  description: string;
  action: string;
  resource: string;
  name: string;
}

export interface UpdateRolePermissionsRequest {
  roleId: string;
  permissions: string[];
}
