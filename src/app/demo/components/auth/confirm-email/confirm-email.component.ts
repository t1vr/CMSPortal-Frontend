import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { TenantService } from 'src/app/demo/service/tenant.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
  providers: [MessageService]
})
export class ConfirmEmailComponent implements OnInit {
  loading = false;
  isEmailConfirmed = false;
  tenantName: string;

  constructor(private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private tenantService: TenantService,
    private router: Router) {
  }

  ngOnInit() {
    let userId = this.activatedRoute.snapshot.queryParamMap.get('userId');
    let code = this.activatedRoute.snapshot.queryParamMap.get('code');
    let tenantKey = this.activatedRoute.snapshot.queryParamMap.get('tenantKey');

    if (!userId || !code || !tenantKey) {
      setTimeout(() => {
        this.router.navigate(['/auth/login']);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      }, 3000);
    } else {
      this.confirmEmail(userId, code, tenantKey);
      this.getTenantInfoByTenantId(tenantKey);
    }
  }
  getTenantInfoByTenantId(tenantidentifier: string) {
    this.tenantService.getTenantByIdentifier(tenantidentifier).subscribe(x => {
      if (x.data) {
        this.tenantName = x.data.name;
        this.isEmailConfirmed = true;
      } else {
        this.isEmailConfirmed = false;

      }
    })
  }
  confirmEmail(userId: string, code: string, tenantKey: string) {
    this.loading = true;
    this.authService.confirmEmail(userId, code, tenantKey).subscribe(x => {
      if (x.succeeded) {
        this.loading = false;
        this.isEmailConfirmed = true;
        this.getPasswordResetToken(userId, tenantKey);
      } else {
        if (x.data) {
          this.loading = false;
          this.isEmailConfirmed = false;
        }
      }
    },
      err => {
        this.loading = false;
        this.isEmailConfirmed = false;
      })
  }

  getPasswordResetToken(userId: string, tenantKey: string) {
    this.authService.getPasswordResetToken(userId, undefined, tenantKey).subscribe(x => {
      if (x.succeeded) {
        let url = this.removeDomainFromUrl(x.data)
        this.router.navigateByUrl(url);
      }
    })
  }

  removeDomainFromUrl(fullUrl) {
    const url = new URL(fullUrl);
    return url.pathname + url.search + url.hash;
  }

}
