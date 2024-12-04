import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

interface RouteData {
  type?: string;
  title?: string;
  desc?: string;
}

@Component({
  selector: 'app-NotFoundPage',
  templateUrl: './NotFoundPage.component.html',
  styleUrls: ['./NotFoundPage.component.css']
})

export class NotFoundPageComponent implements OnInit, OnDestroy {
  type: string = ''; 
  title: string = ''; 
  desc: string = ''; 
  private sub?: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.data.subscribe((param: RouteData) => {
      this.type = param.type || this.route.snapshot.paramMap.get('type') || 'Ooops..'; 
      this.title = param.title || this.getDefaultTitle(this.type);
      this.desc = param.desc || this.getDefaultDescription(this.type);

     
      console.log('Type:', this.type);
      console.log('Title:', this.title);
      console.log('Description:', this.desc);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private getDefaultTitle(type: string): string {
    switch (type) {
      case '404':
        return 'Page Not Found';
      case '500':
        return 'Internal Server Error';
      default:
        return 'Something went wrong';
    }
  }

  private getDefaultDescription(type: string): string {
    switch (type) {
      case '404':
        return "Oops!! The page you were looking for doesn't exist.";
      case '500':
        return 'Oops!! There was an error. Please try again later.';
      default:
        return "Looks like something went wrong.<br> We're working on it.";
    }
  }
}
