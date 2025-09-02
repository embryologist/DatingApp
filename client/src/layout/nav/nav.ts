import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountsService = inject(AccountService);
  private router = inject(Router);
  private notificationServicee = inject(NotificationService);
  protected creds: any = {};

  login() {
    this.accountsService.login(this.creds).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigateByUrl('/members');
        this.creds = {};
        this.notificationServicee.show(
          'success',
          'Login Successful',
          'Welcome back ' + response.displayName + '!'
        );
      },
      error: (error) => {
        console.error('Login failed', error);
        this.notificationServicee.show('error', 'Login Failed', error.error);
      },
    });
  }

  logout() {
    this.accountsService.logout();
    this.notificationServicee.destroy();
    this.router.navigateByUrl('/');
  }
}
