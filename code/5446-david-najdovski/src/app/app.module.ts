import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { DegreesListComponent } from './degrees-list/degrees-list.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule, // Add CommonModule here
    FormsModule, // Add FormsModule here
    RouterModule.forRoot(routes)
  ],
  providers: [],
})
export class AppModule { }

// Bootstrap the application using bootstrapApplication
import { bootstrapApplication } from '@angular/platform-browser';
bootstrapApplication(AppComponent);
