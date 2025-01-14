import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentsListComponent } from './students-list/students-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    StatisticsComponent,
    StudentCreateComponent,
    StudentDetailsComponent,
    StudentEditComponent,
    StudentsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
