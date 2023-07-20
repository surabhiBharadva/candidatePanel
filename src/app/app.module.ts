import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './account/login/login.component';
import { FakeBackendInterceptor } from './service/FakeBackendInterceptor';
import { NotificationComponent } from './notification/notification.component';
import { EmployeeListComponent } from './master/employee-list/employee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotificationComponent,
    EmployeeListComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
   
  ],
  providers: [

    FakeBackendInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
