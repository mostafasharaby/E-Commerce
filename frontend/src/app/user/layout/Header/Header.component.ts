import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../../pages/auth/auth-service/UserAuthentication.service';
@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private router: Router , private authService :UserAuthenticationService) {}

  confirmLogout(): void {
    console.log('Logging out...');
    this.authService.logout();
   // this.isLoggedOut= true;
   this.router.navigate(['/Login']);
  }
  
  cancelLogout(): void {
    console.log('Logout cancelled.');   
    this.router.navigate(['/Home']);
  }
  ngOnInit() {
  }

}
