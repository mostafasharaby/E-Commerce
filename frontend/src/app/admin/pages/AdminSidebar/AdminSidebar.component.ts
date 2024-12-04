import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../../../user/pages/auth/auth-service/UserAuthentication.service';

@Component({
  selector: 'app-AdminSidebar',
  templateUrl: './AdminSidebar.component.html',
  styleUrls: ['./AdminSidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  @Output() toggle = new EventEmitter<boolean>();
  isSidebarClosed = false;
  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
    this.toggle.emit(this.isSidebarClosed);
  }


  constructor(private authService: UserAuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  confirmLogout(): void {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/auth/Login']).then(() => {
      window.location.reload();
    });
  }

  cancelLogout(): void {
    console.log('Logout cancelled.');
    this.router.navigate(['/Home']);
  }

}
