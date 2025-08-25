import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { NotificationService } from '../services/notification.service';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const notificationService = inject(NotificationService);

  if (accountService.currentUser()) return true;
  else {
    notificationService.show(
      'warning',
      'Login Required',
      'You must be logged in to access this page'
    );
    return false;
  }
};
