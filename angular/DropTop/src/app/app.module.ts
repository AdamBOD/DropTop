import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDataComponent } from './user-data/user-data.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/services/auth/auth-guard.service';
import { AuthService } from './shared/services/auth/auth.service';
import { DataTileComponent } from './data-tile/data-tile.component';
import { CreateFormComponent } from './user-data/create-form/create-form.component';

import { EventService } from './shared/services/events.service';

@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    DataTileComponent,
    CreateFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot ([
      {path: 'home', component: UserDataComponent, canActivate: [ AuthGuard ]},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},      
      {path: "404", component: NotFoundComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: "**", redirectTo: "404"},
    ], {useHash: true}),
    MatTabsModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    DatePipe,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
