import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/pages/Home/Home.component';
import { NotFoundPageComponent } from './user/pages/NotFoundPage/NotFoundPage.component';
import { AdminGuard } from './admin/Gaurds/admin.guard';

const routes: Routes = [
  {
    path: '',component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'Home', component: HomeComponent // title: 'resolvedChildATitle'
  },
  {
    path: 'admin', canActivate: [AdminGuard],
    loadChildren: () => import('./admin/AdminModule/AdminModule.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/UserModule/User.module').then(m => m.UserModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./user/pages/product/ProductModule/ProductModule.module').then(m => m.ProductModuleModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./user/pages/auth/AuthenticationModule/AuthenticationModule.module').then(m => m.AuthenticationModuleModule)
  },
  {
    path: 'error', component: NotFoundPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: "Oopps!! The page you were looking for doesn't exist.",
    },
  },
  {
    path: 'error/:type',
    component: NotFoundPageComponent,
  },
  {
    path: '**', redirectTo: 'error', pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
