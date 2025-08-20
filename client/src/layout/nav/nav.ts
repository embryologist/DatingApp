import { ToastService } from './../../core/services/toast.service';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountsService = inject(AccountService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  protected creds: any = {};

  login() {
    this.accountsService.login(this.creds).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigateByUrl('/members');
        this.creds = {};
        this.toastService.success('Login successful', 4000);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.toastService.error(error.error, 4000);
      },
    });
  }

  logout() {
    this.accountsService.logout();
    this.router.navigateByUrl('/');
  }
}
