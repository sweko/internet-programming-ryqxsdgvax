import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  // Import CommonModule here

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, 
    HttpClientModule  // Add this to the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
