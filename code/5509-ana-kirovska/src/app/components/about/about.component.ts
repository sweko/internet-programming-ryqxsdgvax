import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterModule,MatCardModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  student = {
    name: 'Ann kirovska',
    studentId: '5509',
    currentYear: new Date().getFullYear(),
    githubRepo: 'https://github.com/ann/repository-name'
  };
}
