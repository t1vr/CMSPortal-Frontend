import {
  Component,
  OnInit,
} from "@angular/core";
import { MenuItem, PrimeIcons } from "primeng/api";

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
      },
      {
        label: "Review Request",
        icon: PrimeIcons.PENCIL,
        route: ["./review-request"]
      },
      {
        label: "Interdisciplinary Courses",
        icon: PrimeIcons.SITEMAP,
        route: ["./interdisciplinary-courses"]
      },
      {
        label: "Settings",
        icon: "pi pi-cog",
        route: ["./settings"]
      }
    ];
  }
}
