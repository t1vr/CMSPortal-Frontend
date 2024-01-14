import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupComponent } from "./signup.component";
import { RouterModule, Routes } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";

const routes: Routes = [
  { path: "", component: SignupComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
  ],
  declarations: [SignupComponent],
})
export class SignupModule { }
