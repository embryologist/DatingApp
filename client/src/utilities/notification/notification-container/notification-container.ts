import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class NotificationContainer implements OnInit, OnDestroy {
  notifications: INotification[] = [];
  private mySubscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.mySubscription = this.notificationService.notifications$.subscribe(
      (notifications) => {
        this.notifications = notifications;
      }
    );
  }

  dismissNotification(id: number): void {
    this.notificationService.dismiss(id);
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
