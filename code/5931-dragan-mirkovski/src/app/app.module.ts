import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app.routing.module';
import { HeaderModule } from './header.module';
import { StudentModule } from './student.module';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AboutComponent } from './components/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    StatisticsComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    StudentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

