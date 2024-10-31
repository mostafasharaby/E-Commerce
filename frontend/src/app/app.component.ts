import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  
})
export class AppComponent {
  title = 'Angular_With_Bootstrap';
  showHeaderAndNavbar: boolean = true;

  constructor(private router: Router) {}
  ngOnInit(): void { 
    this.router.events.subscribe(() => {
      this.showHeaderAndNavbar = !this.router.url.includes('/admin') && !this.router.url.includes('/error') && !this.router.url.includes('/auth');
    });
  
  }
}
