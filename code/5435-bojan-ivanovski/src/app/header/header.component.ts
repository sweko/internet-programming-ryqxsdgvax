import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  routes = [
    { url: '/students', linkName: 'Students' },
    { url: '/about', linkName: 'About' },
    { url: '/statistics', linkName: 'Statistics' }
  ];
}
