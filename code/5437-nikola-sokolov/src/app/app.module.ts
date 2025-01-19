import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    // Import standalone components directly
    StudentListComponent,
    StudentDetailsComponent,
    StudentCreateComponent
  ]
})
export class AppModule {}
