import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [MessageService]
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup<ResetPasswordForm>;
  email: string;
  code: string;
  tenantKey: string;
  isLoading = false;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    this.initForm();
    this.email = this.activatedRoute.snapshot.queryParamMap.get('email');
    this.code = this.activatedRoute.snapshot.queryParamMap.get('code');
    this.tenantKey = this.activatedRoute.snapshot.queryParamMap.get('tenantKey');
  }

  initForm() {
    this.resetPasswordForm = this.fb.group<ResetPasswordForm>({
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, [Validators.required]),
    }, { validators: [confirmPasswordValidator] });
  }

  submitForm() {
    if (!this.resetPasswordForm.valid) {
      Object.values(this.resetPasswordForm.controls).forEach(control => {
        control.markAsDirty();
      });

      return;
    }

    let request: ResetPasswordRequest = {
      email: this.email,
      password: this.resetPasswordForm.get('password').value,
      token: this.code,
    }
    this.isLoading = true;
    this.authService.resetPassword(request).subscribe(x => {
      if (x.succeeded) {
        this.router.navigate(['/auth/login']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'error', detail: 'Something went wrong' });
      }
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Something went wrong' });
    })
  }

}


export interface ResetPasswordForm {
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return control.value.password === control.value.confirmPassword
    ? null
    : { passwordNoMatch: true };
};


export interface ResetPasswordRequest {
  email: string;
  password: string;
  token: string;
}
