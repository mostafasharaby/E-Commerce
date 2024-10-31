import { Component, OnInit } from '@angular/core';
import bootstrap from 'bootstrap';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})


export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  opened: boolean = true;

  toggleSidenav() {
    this.opened = !this.opened;
  }

  isSidebarClosed = false;
  handleSidebarToggle(isClosed: boolean) {
    this.isSidebarClosed = isClosed;
  }

}

