import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';

@NgModule({
    declarations: [
        StudentListComponent,
        // other components
    ],
    imports: [
        RouterModule,
        StudentListComponent,
        // other modules
    ],
})
export class AppModule {}
