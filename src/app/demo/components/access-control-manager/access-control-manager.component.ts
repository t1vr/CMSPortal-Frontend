import { Component, OnInit } from '@angular/core';
import { RoleItem, RolesService } from '../../service/roles.service';

@Component({
  selector: 'app-access-control-manager',
  templateUrl: './access-control-manager.component.html',
  styleUrls: ['./access-control-manager.component.css']
})
export class AccessControlManagerComponent implements OnInit {
  onSelectionChange(role: RoleItem) {
    this.rolesService.GetRoleByIdWithPermissions(role.id).subscribe(x => {
      console.log(x);
    }, () => {

    })
  }
  roles: RoleItem[] = [];
  selectedRole: RoleItem;

  constructor(private rolesService: RolesService) { }

  ngOnInit() {
    this.getAllRoles();
  }

  getAllRoles() {
    this.rolesService.getAllRoles().subscribe(x => {
      this.roles = x;
    }, () => {

    })
  }
}
