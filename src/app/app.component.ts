import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
    private rolesService: NgxRolesService,
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.permissionsService.loadPermissions(["Admin"])

    let roles = this.rolesService.getRoles();
    console.log(roles);

    this.rolesService.roles$.subscribe((data) => {
      console.log(data);
    });
  }
}
