import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentListComponent } from './student-list/student-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseListComponent } from './course-list/course-list.component';
import { DegreeAddComponent } from './degree-add/degree-add.component';
import { DegreeDetailComponent } from './degree-detail/degree-detail.component';
import { DegreeEditComponent } from './degree-edit/degree-edit.component';
import { DegreeListComponent } from './degree-list/degree-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { StatisticComponent } from './statistic/statistic.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    StudentAddComponent,
    StudentDetailComponent,
    StudentEditComponent,
    StudentListComponent,
    CourseAddComponent,
    CourseDetailComponent,
    CourseEditComponent,
    CourseListComponent,
    DegreeAddComponent,
    DegreeDetailComponent,
    DegreeEditComponent,
    DegreeListComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
