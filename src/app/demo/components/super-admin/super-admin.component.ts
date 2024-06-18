import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../service/tenant.service';
import { Tenant } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
