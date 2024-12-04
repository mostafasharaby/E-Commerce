import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Assuming you're using Angular Material for notifications

@Injectable({
  providedIn: 'root',
})
export class NotificationHandlerService {
  constructor(private snackBar: MatSnackBar) {}

  // Method to show notification
  showNotification(type: 'success' | 'error' | 'info', title: string, message: string): void {
    let panelClass = '';

    switch (type) {
      case 'success':
        panelClass = 'notification-success';
        break;
      case 'error':
        panelClass = 'notification-error';
        break;
      case 'info':
        panelClass = 'notification-info';
        break;
    }

    // Showing the notification using Angular Material Snackbar
    this.snackBar.open(`${title}: ${message}`, 'Close', {
      duration: 3000, // Notification will auto-close after 3 seconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}
