import { Component, inject } from '@angular/core';
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

  login() {
    this.accountsService.login(this.creds).subscribe({
      next: (response) => {
        console.log('Login successful', response);
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials and try again.' + ' ' + error.message);
      }
    })
  }
}