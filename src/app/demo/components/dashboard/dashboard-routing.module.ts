import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DashboardComponent,

    }
  ])],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
