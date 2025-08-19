import { Component, inject, Input, signal } from '@angular/core';
import { AccountService } from '../../core/services/accounts/account-service';
import { Register } from "../account/register/register";
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  @Input({required: true }) membersFromApp: IUser[] = []; // one way data binding between parent and child

  protected registerMode = signal(false);

  protected accountService = inject(AccountService);

  showRegister(value: boolean){
    this.registerMode.set(value);
  }

}
