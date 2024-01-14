import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LoginRequestModel, SignUpTenantRequestModel, SignUpTenantResponseModel } from 'src/app/models/tenant.model';
import { LoginResponseModel } from '../../../../models/tenant.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

  logInForm!: FormGroup<LogInForm>;

  constructor(public layoutService: LayoutService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.logInForm = this.fb.group<LogInForm>({
      tenantIdentifier: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onLogInFormSubmit() {
    if (this.logInForm.invalid) {
      return;
    }

    this.authService.login(this.logInForm.value as LoginRequestModel).subscribe(
      (_: LoginResponseModel) => {

        this.router.navigate([this.logInForm.value.tenantIdentifier])
      }
    )
  }
}

export class LogInForm {
  tenantIdentifier: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}



