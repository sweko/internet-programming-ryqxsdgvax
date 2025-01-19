import { Routes } from '@angular/router';
import { StudentListComponent } from './studentlist/studentlist.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
    { path: '', component: StudentListComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'footer', component: FooterComponent}
];