import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INotification } from '../../../interfaces/notification.interface';

@Component({
  selector: 'app-notification-body',
  imports: [],
  templateUrl: './notification-body.html',
  styleUrl: './notification-body.css',
})
export class NotificationBody {
  @Input() notification!: INotification;
  @Output() dismiss = new EventEmitter<number>();

  dismissNotification(): void {
    this.dismiss.emit(this.notification.id);
  }
}
