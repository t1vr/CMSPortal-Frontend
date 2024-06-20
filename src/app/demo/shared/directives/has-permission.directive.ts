import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { CurrentUserService } from '../../service/current.user.service';
import { PermissionService } from '../../service/permission.service';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
  private currentUser;
  private permissions = [];

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private currentUserService: CurrentUserService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.currentUser = this.currentUserService.getCurrentUser();
  }

  @Input()
  set hasPermission(val) {
    console.log('==========>')
    this.permissions = val;
    this.updateView();
  }

  private updateView() {
    if (this.permissionService.hasPermissions(this.permissions)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
