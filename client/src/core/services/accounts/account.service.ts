import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ILoginCreds, IRegisterCreds, IUser } from '../../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
private http = inject(HttpClient);
currentUser = signal<IUser | null>(null); // | is called union
baseUrl = 'https://localhost:5001/api/'; // Replace with your actual API base URL

register(creds: IRegisterCreds){
    return this.http.post<IUser>(this.baseUrl + 'account/register', creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

login(creds: ILoginCreds) {
    return this.http.post<IUser>(this.baseUrl + 'account/login', creds).pipe(
    tap(user => {
      if (user) {
       this.setCurrentUser(user);
      }
    })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
  setCurrentUser(user: IUser){
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
