import { Component, Inject, inject, Input, signal } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { Register } from '../account/register/register';
import { IUser } from '../../interfaces/user';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @Input({ required: true }) membersFromApp: IUser[] = []; // one way data binding between parent and child
  protected registerMode = signal(false);
  protected accountService = inject(AccountService);
  protected notificationService = inject(NotificationService);

  showRegister(value: boolean) {
    this.registerMode.set(value);
  }
  show() {
    this.notificationService.show(
      'info',
      'WTH',
      'Hello from Home Component!',
      30000
    );
  }
}
