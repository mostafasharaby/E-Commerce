import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './compontents/Layout/Header/Header.component';
import { FooterComponent } from './compontents/Layout/Footer/Footer.component';
import { NavbarComponent } from './compontents/Layout/Navbar/Navbar.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './compontents/Page/Home/Home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AdminModule } from './adminModule/AdminModule.module';
import { UserModule } from './UserModule/User.module';
import { ProductModuleModule } from './ProductModule/ProductModule.module';
import { MainLayoutComponent } from './compontents/Layout/MainLayout/MainLayout.component';
import { NotFoundPageComponent } from './compontents/Page/NotFoundPage/NotFoundPage.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,   
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    MainLayoutComponent,
    NotFoundPageComponent
    
    
  ],
  imports: [
    BrowserModule,
    CommonModule ,
    AdminModule,
    UserModule,
    ProductModuleModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MatButtonModule, 
    NgbModule ,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,    
    MatCardModule,
    MatListModule,
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
