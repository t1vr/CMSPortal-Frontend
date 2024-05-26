import {
  Component,
  OnInit,
} from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-curriculum-side-menu",
  templateUrl: "./curriculum-side-menu.component.html",
  styles: [
    `.active {
      background-color:  #e9f2ff;
      border-left: 4px solid #2979ff;
      color:#2979ff !important;
      border-radius:3px;}`,
  ],
})
export class CurriculumSideMenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: "Summary",
        icon: "pi pi-home",
        route: ["./"],
      },
      {
        label: "Courses",
        icon: "pi pi-list",
        route: ["./list"]
      }
    ];
  }
}
