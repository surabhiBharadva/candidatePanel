import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './account/login/login.component';
import { NotificationComponent } from './notification/notification.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { candiddateSer } from './service/candidateSer';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotificationComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(candiddateSer),
    HttpClientInMemoryWebApiModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
