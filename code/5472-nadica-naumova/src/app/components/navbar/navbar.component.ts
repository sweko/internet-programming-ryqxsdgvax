import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-blue-500">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <a routerLink="/" class="text-white text-xl font-bold">
            University Management
          </a>
          <div class="flex space-x-4">
            <a routerLink="/students" 
               routerLinkActive="bg-blue-600"
               class="text-white px-3 py-2 rounded-md hover:bg-blue-600">
              Students
            </a>
            <a routerLink="/degrees" 
               routerLinkActive="bg-blue-600"
               class="text-white px-3 py-2 rounded-md hover:bg-blue-600">
              Degrees
            </a>
            <a routerLink="/courses" 
               routerLinkActive="bg-blue-600"
               class="text-white px-3 py-2 rounded-md hover:bg-blue-600">
              Courses
            </a>
            <a routerLink="/statistics" 
               routerLinkActive="bg-blue-600"
               class="text-white px-3 py-2 rounded-md hover:bg-blue-600">
              Statistics
            </a>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}