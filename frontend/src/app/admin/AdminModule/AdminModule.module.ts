import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from '../pages/Admin/Admin.component';
import { DashboardComponent } from '../pages/DashBoard/Dashboard.component';
import { OrderComponent } from '../pages/Order/Order.component';
import { AdminProductComponent } from '../pages/AdminProduct/AdminProduct.component';
import { CustomersComponent } from '../pages/Customers/Customers.component';
import { AddProductComponent } from '../pages/AddProduct/AddProduct.component';
import { AdminNavComponent } from '../pages/AdminNav/AdminNav.component';
import { AdminSidebarComponent } from '../pages/AdminSidebar/AdminSidebar.component';
import { ProductModuleModule } from '../../user/pages/product/ProductModule/ProductModule.module';


const routes: Routes = [
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
    HttpClientModule
     
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
