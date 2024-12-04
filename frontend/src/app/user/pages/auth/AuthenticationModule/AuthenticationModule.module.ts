import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../Login/Login.component';
import { LogoutComponent } from '../Logout/Logout.component';
import { RegisterComponent } from '../Register/Register.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path:'Login', component: LoginComponent},
  {path:'Register', component: RegisterComponent},
  {path:'Logout', component: LogoutComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ]
})
export class AuthenticationModuleModule { }
