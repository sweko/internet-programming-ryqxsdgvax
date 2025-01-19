import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
