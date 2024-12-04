import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../pages/Profile/Profile.component';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path:'profile', component: ProfileComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
    
  ],
  declarations: [
    ProfileComponent   
  
  ]
})
export class UserModule { }
