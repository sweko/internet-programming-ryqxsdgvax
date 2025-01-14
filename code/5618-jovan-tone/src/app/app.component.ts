import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear = new Date().getFullYear();
  studentName = 'Jovan Tone';
  studentId = '5618';
  
  routes = [
    { linkName: 'Students', url: '/students' },
    { linkName: 'Statistics', url: '/statistics' },
    { linkName: 'About', url: '/about' }
  ];
}
