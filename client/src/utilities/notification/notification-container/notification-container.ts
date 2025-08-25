import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { INotification } from '../../../interfaces/notification.interface';
import { NotificationBody } from '../notification-body/notification-body';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-container',
  imports: [CommonModule, NotificationBody],
  templateUrl: './notification-container.html',
  styleUrl: './notification-container.css',
})
export class NotificationContainer implements OnInit {
  notifications: INotification[] = [];

  private notificationService = inject(NotificationService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
      this.cdr.detectChanges();
    });
  }

  dismissNotification(id: number): void {
    this.notificationService.dismiss(id);
  }
}
