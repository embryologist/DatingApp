import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { INotification } from '../../interfaces/notification.interface';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: INotification[] = [];
  private notificationSubject: BehaviorSubject<INotification[]> =
    new BehaviorSubject<INotification[]>([]);
  private nextId = 0;

  get notifications$(): Observable<INotification[]> {
    return this.notificationSubject.asObservable();
  }

  show(
    message: string,
    type: 'success' | 'error' | 'info',
    duration: number = 3000
  ): void {
    const newNotification: INotification = {
      id: this.nextId++,
      message,
      type,
    };
    this.notifications.push(newNotification);
    this.notificationSubject.next(this.notifications);

    setTimeout(() => this.dismiss(newNotification.id), duration);
  }

  dismiss(id?: number): void {
    if (id !== undefined) {
      this.notifications = this.notifications.filter((n) => n.id !== id);
      this.notificationSubject.next(this.notifications);
    }
  }
}
