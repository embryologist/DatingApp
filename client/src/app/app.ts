import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Nav } from '../layout/nav/nav';
import { Router, RouterOutlet } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
import { NotificationContainer } from '../utilities/notification/notification-container/notification-container';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, NotificationContainer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected router = inject(Router);
  protected notificationService = inject(NotificationService);

  ngOnInit() {
    this.notificationService.show(
      'info',
      'Welcome',
      'Application loaded successfully!',
      3000
    );
  }
}
