import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../Services/userAuthentication/UserAuthentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-AdminNav',
  templateUrl: './AdminNav.component.html',
  styleUrls: ['./AdminNav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(  
             ) { }

  ngOnInit() {
  }

}
