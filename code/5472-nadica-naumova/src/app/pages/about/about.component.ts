

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div class="px-6 py-8">
            <h1 class="text-3xl font-bold text-center mb-8">About Student Management System</h1>

            <div class="space-y-6">
              <div>
                <h2 class="text-xl font-semibold mb-2">Student Information</h2>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-600">Name</p>
                    <p class="font-medium">Nadica Naumova</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Student ID</p>
                    <p class="font-medium">5472</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 class="text-xl font-semibold mb-2">Project Details</h2>
                <div class="space-y-2">
                  <div>
                    <p class="text-sm text-gray-600">Course</p>
                    <p class="font-medium">Internet Programming</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Academic Year</p>
                    <p class="font-medium">2023/2024</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Project Repository</p>
                    <a 
                      href="https://github.com/your-username/student-management"
                      target="_blank"
                      class="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 class="text-xl font-semibold mb-2">Technologies Used</h2>
                <ul class="list-disc list-inside space-y-1">
                  <li>Angular 17</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>RESTful API Integration</li>
                </ul>
              </div>

              <div>
                <h2 class="text-xl font-semibold mb-2">Features</h2>
                <ul class="list-disc list-inside space-y-1">
                  <li>Student Management (CRUD operations)</li>
                  <li>Grade Management</li>
                  <li>Course Tracking</li>
                  <li>Statistical Analysis</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {
  currentYear = new Date().getFullYear();
}