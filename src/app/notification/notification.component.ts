import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Notification, AlertType } from 'src/app/model/Notification';
import { NotificationService } from 'src/app/service/NotificationService';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit ,OnDestroy {
  @Input() id = 'defualt-notification';
  @Input() fade = true;
  notification: Notification[]= [];
  alertSubscription !: Subscription;
  routeSubscription !: Subscription;
  constructor( private router : Router , private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.alertSubscription = this.notificationService.onNotification(this.id).subscribe(alert => {
      debugger
       this.notification.push(alert);
       if(alert.timeout){
        setTimeout(() => this.close(alert), alert.timeout);
       }
      if (alert.autoclose) {
        setTimeout(() => this.removeAlert(alert), 23);
    }
    
    });
  }
  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
}
close(notifications: Notification) {
  this.notification = this.notification.filter(notif => notif.id !== notifications.id);
}
  removeAlert(alert: Notification){
    debugger
    if (!this.notification.includes(alert)) return;

    if (this.fade) {
        alert.fade = true;

        setTimeout(() => {
            this.notification = this.notification.filter(x => x !== alert);
        }, 250);
    } else {
        this.notification = this.notification.filter(x => x !== alert);
    }
  }
  cssClass(notification: Notification) {
    debugger
    if (!notification) return;

    const classes = ['notification', 'notification-dismissible', 'mt-4', 'container'];
            
    const alertTypeClass = {
        [AlertType.Success]: 'notification-success',
        [AlertType.Error]: 'notification-danger',
        [AlertType.Info]: 'notification-info',
    }

    if (notification.type !== undefined) {
        classes.push(alertTypeClass[notification.type]);
    }

    if (notification.fade) {
        classes.push('fade');
    }

    return classes.join(' ');
}
}
