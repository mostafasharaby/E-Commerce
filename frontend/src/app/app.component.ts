import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import bootstrap from 'bootstrap';
import { AdminComponent } from './compontents/AdminPart/Admin/Admin/Admin.component';
import { AdminSidebarComponent } from './compontents/AdminPart/AdminSidebar/AdminSidebar.component';
import { AdminNavComponent } from './compontents/AdminPart/AdminNav/AdminNav.component';
import { CommonModule } from '@angular/common';
//import { AppSignalRService } from './Services/AppSignalR/AppSignalR.service';

@Component({
  selector: 'app-root',
 // standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //imports: [CommonModule , RouterOutlet]
})
export class AppComponent {
  title = 'Angular_With_Bootstrap';

  userInput: string = '';
  messageInput: string = '';
  receivedMessages: { user: string, message: string }[] = []; // To store all user-message pairs

  //constructor(private signalRService: AppSignalRService) {}
  showHeaderAndNavbar: boolean = true;

  constructor(private router: Router) {}
  ngOnInit(): void {
    // Start the SignalR connection
    // this.signalRService.startConnection().subscribe(() => {
    //   // Subscribe to received messages
    //   this.signalRService.receiveMessage().subscribe(({ user, message }) => {
    //     this.receivedMessages.push({ user, message }); // Push each received user-message pair into the array
    //   });
    // });
 
    this.router.events.subscribe(() => {
      // Define the routes where you want to hide the header and navbar
      // const hiddenRoutes = ['/login', '/register', '/admin'];
      // const hiddenRoutes = ['/admin/customers' , '/admin/dashboard' , '/admin/product' ,'/admin/order','/admin/AddProduct' ,'/error' ,'/error/404','/error/500'];
      // this.showHeaderAndNavbar = !hiddenRoutes.includes(this.router.url);
      this.showHeaderAndNavbar = !this.router.url.includes('/admin') && !this.router.url.includes('/error') && !this.router.url.includes('/auth');

    });
  
  }

  // Method to send both user and message
  // sendMessage(): void {
  //   if (this.userInput && this.messageInput) {
  //     this.signalRService.sendMessage(this.userInput, this.messageInput);
  //     this.messageInput = ''; // Clear the message input after sending
  //   } else {
  //     alert('Please enter both a user and a message');
  //   }
  // }

}
