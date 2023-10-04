import { Injectable } from '@angular/core';

const DEFAULT_ICON = 'assets/job-cloud-logo.png';

export interface Notification {
  title: string;
  body: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  createNotification(params: Notification) {
    if (this.requestNotificationsPermission()) {
      new Notification(params.title, { body: params.body, icon: params.icon || DEFAULT_ICON });
    }
  }

  /**
   * Modified version of https://developer.mozilla.org/en-US/docs/Web/API/Notification/permission_static
   */
  requestNotificationsPermission(): boolean {
    if (!('Notification' in window)) {
      // Check if the browser supports notifications
      return false;
    } else if (Notification.permission === 'granted') {
      // Check whether notification permissions have already been granted;
      return true;
    } else if (Notification.permission !== 'denied') {
      // We need to ask the user for permission
      Notification.requestPermission().then((r) =>
        this.createNotification({
          title: 'Notifications active',
          body: 'You will now start receiving notifications for new, updated and deleted jobs',
        }),
      );
    }
    return false;
  }
}
