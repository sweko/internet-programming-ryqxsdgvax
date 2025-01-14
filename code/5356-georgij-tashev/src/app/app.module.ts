import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { StudentEditComponent } from './pages/student-edit/student-edit.component';
import { StudentCreateComponent } from './pages/student-create/student-create.component';
import { DegreesListComponent } from './pages/degrees-list/degrees-list.component';
import { CoursesListComponent } from './pages/courses-list/courses-list.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StudentListComponent,
    StudentDetailsComponent,
    StudentEditComponent,
    StudentCreateComponent,
    DegreesListComponent,
    CoursesListComponent,
    StatisticsComponent,
    AboutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
