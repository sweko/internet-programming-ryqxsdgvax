import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  routes = [
    { url: '/students', linkName: 'Students' },
    { url: '/statistics', linkName: 'Statistics' },
    { url: '/about', linkName: 'About' }
  ];

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
