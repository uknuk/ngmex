import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { FlexLayoutModule } from '@angular/flex-layout';

import { ApiService } from './api.service'



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatButtonModule,
    NoopAnimationsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
