import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/accounts/account.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {

  protected accountsService = inject(AccountService);

  protected creds: any = {}

  login() {
    this.accountsService.login(this.creds).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        alert('Login successful! Welcome back.');
        this.creds = {};
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials and try again.' + ' ' + error.message);
      }
    })
  }

  logout() {
    this.accountsService.logout();
  }
}
