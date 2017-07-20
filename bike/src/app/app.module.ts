import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BikeComponent } from './bike/bike.component';
import { BrowseComponent } from './browse/browse.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { HttpModule } from '@angular/http'; // <-- Import HttpModule
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { LoginComponent } from './login/login.component';
import { EqualValidator } from './equal-validator.directive'

@NgModule({
  declarations: [
    AppComponent,
    BikeComponent,
    BrowseComponent,
    ManageComponent,
    LoginComponent,
    EqualValidator
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- Include module in our AppModules
		HttpModule, // <-- Include module in our AppModules
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
