import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';


const usersModule = () => import('./user/user.module').then(x => x.UserModule);
const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [] },
    { path: 'dashboard', loadChildren: usersModule, canActivate: [] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
