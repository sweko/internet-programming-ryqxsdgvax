 // src/app/components/student-create/student-create.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from '../../components/student-form/student-form.component';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [CommonModule, StudentFormComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <h2 class="text-2xl font-bold">Create New Student</h2>
      </div>
      
      <app-student-form></app-student-form>
    </div>
  `
})
export class StudentCreateComponent {}