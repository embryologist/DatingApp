import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { NotificationService } from '../services/notification.service';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toastService = inject(NotificationService);

  if (accountService.currentUser()) return true;
  else {
    toastService.show('You must be logged in to access this page', 'error');
    return false;
  }
};
