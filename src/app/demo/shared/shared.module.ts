import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { HasPermissionDirective } from './directives/has-permission.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedComponent, HasPermissionDirective],
  exports: [HasPermissionDirective]
})
export class SharedModule {
  constructor() {
    console.log('shared module has been called')
  }
}
