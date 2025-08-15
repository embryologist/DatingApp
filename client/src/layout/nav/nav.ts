import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../core/services/accounts/service.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  private accountsService = inject(ServiceService);
  protected creds: any = {}
  protected isLoggedIn = signal(false); 

  login() {
    this.accountsService.login(this.creds).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.isLoggedIn.set(true);
        alert('Login successful! Welcome back.');
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials and try again.' + ' ' + error.message);
      }
    })
  }

  logout() {
    this.isLoggedIn.set(false);
  }
}