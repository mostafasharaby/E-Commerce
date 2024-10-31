import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserAuthenticationService } from '../../../Services/userAuthentication/UserAuthentication.service';
import { Router } from '@angular/router';

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
    this.router.navigate(['/auth/Login']);
  }

  cancelLogout(): void {
    console.log('Logout cancelled.');
    this.router.navigate(['/Home']);
  }

}
