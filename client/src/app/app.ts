import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/accounts/account-service';
import { Home } from "../features/home/home";
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountSerice = inject(AccountService);
  private http = inject(HttpClient);

  protected readonly title = 'client';

  protected members = signal<IUser[]>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountSerice.currentUser.set(user);
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get<IUser[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error;
    }
  }
}
