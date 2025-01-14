import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-gray-800 text-white mt-8">
      <div class="container mx-auto px-4 py-6">
        <div class="text-center">
          <p>© {{currentYear}} Student Management System</p>
          <p class="mt-2">Student ID: YOUR_ID - Student Name: YOUR_NAME</p>
          <a routerLink="/about" class="text-blue-400 hover:text-blue-300 mt-2 inline-block">
            About
          </a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}