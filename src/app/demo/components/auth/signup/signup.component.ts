import { Component, OnInit } from "@angular/core";
import { LayoutService } from "src/app/layout/service/app.layout.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styles: [
    `
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
      transform: scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }`,
  ],
})
export class SignupComponent {
  password!: string;

  constructor(public layoutService: LayoutService) { }

  onFormSubmit() {
    throw new Error('Method not implemented.');
  }
}
