import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './user/pages/Home/Home.component';
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
import { UserModule } from './user/UserModule/User.module';
import { NotFoundPageComponent } from './user/pages/NotFoundPage/NotFoundPage.component';
import { AuthenticationModuleModule } from './user/pages/auth/AuthenticationModule/AuthenticationModule.module';
import { HeaderComponent } from './user/layout/Header/Header.component';
import { FooterComponent } from './user/layout/Footer/Footer.component';
import { NavbarComponent } from './user/layout/Navbar/Navbar.component';
import { MainLayoutComponent } from './user/layout/MainLayout/MainLayout.component';
import { AdminModule } from './admin/AdminModule/AdminModule.module';
import { ProductModuleModule } from './user/pages/product/ProductModule/ProductModule.module';
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
    AuthenticationModuleModule,
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
