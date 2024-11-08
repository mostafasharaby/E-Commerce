import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../compontents/AdminPart/Admin/Admin/Admin.component';
import { DashboardComponent } from '../compontents/AdminPart/DashBoard/Dashboard/Dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminSidebarComponent } from '../compontents/AdminPart/AdminSidebar/AdminSidebar.component';
import { AdminNavComponent } from '../compontents/AdminPart/AdminNav/AdminNav.component';
import { ProductModuleModule } from '../ProductModule/ProductModule.module';
import { AdminProductComponent } from '../compontents/AdminPart/AdminProduct/AdminProduct.component';
import { FormsModule } from '@angular/forms';
import { CustomersComponent } from '../compontents/AdminPart/Customers/Customers.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from '../compontents/AdminPart/Order/Order.component';
import { AddProductComponent } from '../compontents/AdminPart/AddProduct/AddProduct.component';

const routes: Routes = [
  // {
  //  path: '', component: DashboardComponent 
  // },
  {
    path: 'admin', 
    component: AdminComponent,  
    children: [
    
      { path: 'dashboard', component: DashboardComponent },
      { path: 'order', component: OrderComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'AddProduct', component: AddProductComponent },
      { path: 'AdminNav', component: AdminNavComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } 
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProductModuleModule,
    FormsModule,
    HttpClientModule,
    CommonModule 
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    AdminSidebarComponent,
    AdminNavComponent,
    AdminProductComponent,
    CustomersComponent,
    OrderComponent,
    AddProductComponent
    
  ],
  exports: [   // <-- Add the export here
    AdminComponent,
    DashboardComponent,
    AdminSidebarComponent,
    AdminNavComponent
  ]
})
export class AdminModule { }
