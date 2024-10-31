import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './compontents/Page/Home/Home.component';
import { NotFoundPageComponent } from './compontents/Page/NotFoundPage/NotFoundPage.component';
import { AdminGuard } from './Gaurds/admin.guard';

const routes: Routes = [
  {
    path: '',component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'Home', component: HomeComponent // title: 'resolvedChildATitle'
  },
  {
    path: 'admin', canActivate: [AdminGuard],
    loadChildren: () => import('./adminModule/AdminModule.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./UserModule/User.module').then(m => m.UserModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./ProductModule/ProductModule.module').then(m => m.ProductModuleModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./AuthenticationModule/AuthenticationModule.module').then(m => m.AuthenticationModuleModule)
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
