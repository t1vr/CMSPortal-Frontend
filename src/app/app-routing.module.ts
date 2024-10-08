import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { CanLoadGuard } from './guards/canLoad.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: AppLayoutComponent,
        children: [
          { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
          { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
          { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
          { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
          { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
        ]
      },
      {
        path: 'super-admin', component: AppLayoutComponent,
        children: [
          { path: '', loadChildren: () => import('./demo/components/super-admin/super-admin.module').then(m => m.SuperAdminModule) },
        ]
      },
      { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
      {
        path: ':tenantIdentifier', component: AppLayoutComponent,
        // canActivate: [CanActivateWithRoleGuard],
        // data: { role: [Role.Admin, Role.Faculty] },
        children: [
          {
            path: '',
            loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule),
            canLoad: [CanLoadGuard],
          },
          { path: 'programs', loadChildren: () => import('./demo/components/programs/programs.module').then(m => m.ProgramsModule) },
          { path: 'curriculums', loadChildren: () => import('./demo/components/curriculum/curriculum.module').then(m => m.CurriculumModule) },
          { path: 'manage-programs', loadChildren: () => import('./demo/components/program-manager/program-manager.module').then(m => m.ProgramManagerModule) },
          { path: 'manage-courses', loadChildren: () => import('./demo/components/course-manager/course-manager.module').then(m => m.CourseManagerModule) },
          { path: 'manage-curriculums', loadChildren: () => import('./demo/components/curriculum/curriculum.module').then(m => m.CurriculumModule) },
          { path: 'manage-faculties', loadChildren: () => import('./demo/components/faculty-manager/faculty-manager.module').then(m => m.FacultyManagerModule) },
          { path: 'access-controls', loadChildren: () => import('./demo/components/access-control-manager/access-control-manager.module').then(m => m.AccessControlManagerModule) },

        ]
      },
      { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
      { path: 'notfound', component: NotfoundComponent },
      { path: '**', redirectTo: '/notfound' },
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
