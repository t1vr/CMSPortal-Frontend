import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-curriculum-side-menu',
  templateUrl: './curriculum-side-menu.component.html'
})
export class CurriculumSideMenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Summary',
        icon: 'pi pi-home',
        route: ['./']
      },
      {
        label: 'Courses',
        icon: 'pi pi-list',
        route: ['./list']
      }
    ]
  }
}


