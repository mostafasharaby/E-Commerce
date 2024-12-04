import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { UserAuthenticationService } from '../auth-service/UserAuthentication.service';
@Component({
  selector: 'app-Logout',
  templateUrl: './Logout.component.html',
  styleUrls: ['./Logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router , private authService :UserAuthenticationService) {}

  confirmLogout(): void {
    console.log('Logging out...');
    this.authService.logout();
   // this.isLoggedOut= true;
   this.router.navigate(['/UserLogin']);
  }
  private logoutModal: Modal | undefined;
 
  cancelLogout(): void {
    console.log('Logout cancelled.');   
    this.router.navigate(['/Home']);

  }

  
  ngOnInit() {
    // const modalElement = document.getElementById('logoutModal');
    // if (modalElement) {
    //   this.logoutModal = new Modal(modalElement);
    // }
  }

}
