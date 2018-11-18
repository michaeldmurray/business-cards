import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { HistoryComponent } from './history/history.component';

import { firebaseConfig } from '../environments/environment';

// modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing/app-routing.module';

// services
import { DashboardService } from './dashboard/dashboard.service';
import { LoginService } from './login/login.service';
import { TextDetectionService } from './text-detection.service';
import { HistoryService } from './history/history.service';

import {AuthGuard} from './login/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BusinessCardComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, DashboardService, HistoryService, LoginService, TextDetectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
