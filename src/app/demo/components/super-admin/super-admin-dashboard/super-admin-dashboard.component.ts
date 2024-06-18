import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TenantService } from 'src/app/demo/service/tenant.service';
import { Tenant, UserItem } from 'src/app/models/tenant.model';
import { FacultyUpsertComponent } from '../../faculty-manager/faculty-upsert/faculty-upsert.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TenantUpsertComponent } from '../tenant-upsert/tenant-upsert.component';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css'],
  providers: [DialogService, MessageService]
})
export class SuperAdminDashboardComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem;
  tenants: Tenant[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(private tenantService: TenantService,
    private dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'All Tenants' }
    ];
    this.activeItem = this.items[0];
    this.getAllTenants();

  }
  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
  getAllTenants() {
    this.tenantService.getAllTenants().subscribe(x => {
      if (x.succeeded) {
        this.tenants = x.data;
        console.log(this.tenants)
      }
    })
  }

  showTenantCreateDialog() {
    this.ref = this.dialogService.open(TenantUpsertComponent, {
      header: 'Tenant Information',
      width: '70%',
      baseZIndex: 10000,
      maximizable: true,
      closeOnEscape: true,

    });

    this.ref.onClose.subscribe((_) => {
      this.getAllTenants();
    });
  }

  onClickEditTenant(tenant: Tenant) {
    this.ref = this.dialogService.open(TenantUpsertComponent, {
      header: 'Tenant Information',
      width: '70%',
      height: '70%',
      baseZIndex: 10000,
      maximizable: true,
      data: tenant
    });

    this.ref.onClose.subscribe((_) => {
      this.getAllTenants();
    });
  }
}



