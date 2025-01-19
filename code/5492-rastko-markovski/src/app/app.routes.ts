import { Routes } from '@angular/router';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', component: StudentlistComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'footer', component: FooterComponent},
    { path: 'about', component: AboutComponent}
];
