import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/demo/service/auth.service";
import { LocalStorageService } from "src/app/demo/service/local.storage.service";
import { TenantService } from "src/app/demo/service/tenant.service";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { SignUpTenantRequestModel, SignUpTenantResponseModel } from "src/app/models/tenant.model";

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
  signupForm!: FormGroup<SignupForm>;

  constructor(public layoutService: LayoutService,
    private fb: FormBuilder,
    private router: Router,
    private tenantService: TenantService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group<SignupForm>({
      identifier: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      adminEmail: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  onSignUpFormSubmit() {
    // Object.keys(this.signupForm.controls).forEach(key => {
    //   this.signupForm.controls[key].markAsDirty();
    //   this.signupForm.controls[key].updateValueAndValidity();
    // });
    if (this.signupForm.invalid) {
      return;
    }
    let signUpTenantRequestModel: SignUpTenantRequestModel = {
      adminEmail: this.signupForm.value.adminEmail,
      name: this.signupForm.value.name,
      id: this.signupForm.value.identifier,
      description: "",
      isActive: false,
    }
    this.localStorageService.setTenantIdentifier(signUpTenantRequestModel.id);

    this.tenantService.signUpTenant(signUpTenantRequestModel).subscribe(
      (_: SignUpTenantResponseModel) => {
        this.router.navigateByUrl('auth/login')
      }
    )
  }
}


export function MustMatch(controlName: string, matchingControlName: string) {
  return (group: AbstractControl) => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    // return if another validator has already found an error on the matchingControl
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  }
}


export class SignupForm {
  identifier!: FormControl<string>;
  name!: FormControl<string>;
  adminEmail!: FormControl<string>;
  password!: FormControl<string>;
  confirmPassword!: FormControl<string>;
}
