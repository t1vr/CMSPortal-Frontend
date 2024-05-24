import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { CurrentUserService } from '../demo/service/current.user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

  items!: MenuItem[];
  profileMenuItems: MenuItem[];
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService,
    private currentUserService: CurrentUserService) { }

  ngOnInit(): void {
    this.profileMenuItems = [
      {
        label: 'Profiles',
        items: [
          {
            label: 'Log out',
            command: () => {
              this.logOut();
            }
          },
          {
            label: 'Manage Profiles',
            command: () => {
              this.goToManageProfile();
            }
          }
        ]
      }
    ];
  }
  goToManageProfile() {
    throw new Error('Method not implemented.');
  }
  logOut() {
    this.currentUserService.logOut();
  }


}
