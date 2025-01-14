import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Student, Course } from '../../../shared/interfaces';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="student-detail" *ngIf="student">
      <h2>Student Details</h2>
      
      <div class="section">
        <h3>Personal Information</h3>
        <div class="info-grid">
          <div class="info-item">
            <label>Student ID:</label>
            <span>{{ student.studentId }}</span>
          </div>
          <div class="info-item">
            <label>Full Name:</label>
            <span>{{ student.firstName }} {{ student.lastName }}</span>
          </div>
          <div class="info-item">
            <label>Date of Birth:</label>
            <span>{{ student.dateOfBirth | date }}</span>
          </div>
          <div class="info-item">
            <label>Email:</label>
            <span>{{ student.email }}</span>
          </div>
          <div class="info-item">
            <label>Degree:</label>
            <span>{{ student.degree }}</span>
          </div>
          <div class="info-item">
            <label>Year of Study:</label>
            <span>{{ student.year }}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Course Management</h3>
        <div class="courses-table">
          <table class="table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Name</th>
                <th>Semester</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (course of availableCourses; track course.code) {
                <tr>
                  <td>{{ course.code }}</td>
                  <td>{{ course.name }}</td>
                  <td>{{ course.semester }}</td>
                  <td>
                    @if (getStudentCourse(course.code)?.grade) {
                      {{ getStudentCourse(course.code)?.grade?.percentage }}% 
                      ({{ getStudentCourse(course.code)?.grade?.letter }})
                    } @else {
                      <span class="not-graded">Not Graded</span>
                    }
                  </td>
                  <td>
                    @if (getStudentCourse(course.code)?.grade) {
                      <button class="btn btn-sm btn-warning" 
                              (click)="openGradeModal(course, true)">
                        Change Grade
                      </button>
                      <button class="btn btn-sm btn-danger" 
                              (click)="removeGrade(course)">
                        Remove Grade
                      </button>
                    } @else {
                      <button class="btn btn-sm btn-primary" 
                              (click)="openGradeModal(course)">
                        Add Grade
                      </button>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="summary">
          <p>Average Grade: {{ calculateAverageGrade() }}</p>
          <p>Success Rate: {{ calculateSuccessRate() }}%</p>
        </div>
      </div>

      <!-- Grade Modal -->
      @if (selectedCourse) {
        <div class="modal">
          <div class="modal-content">
            <h3>Add Grade for {{ selectedCourse.code }}</h3>
            <form (ngSubmit)="addGrade()">
              <div class="form-group">
                <label for="grade">Percentage Grade (0-100)</label>
                <input type="number" id="grade" 
                       [(ngModel)]="newGrade" 
                       name="grade"
                       min="0" 
                       max="100" 
                       required>
              </div>
              <div class="modal-actions">
                <button type="submit" class="btn btn-primary">Save Grade</button>
                <button type="button" class="btn btn-secondary" 
                        (click)="closeGradeModal()">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <div class="actions">
        <button class="btn btn-warning" (click)="editStudent()">Edit</button>
        <button class="btn btn-danger" (click)="deleteStudent()">Delete</button>
        <button class="btn btn-secondary" (click)="backToList()">Back to List</button>
      </div>
    </div>
  `,
  styles: [`
    .student-detail {
      padding: var(--spacing-md);
    }
    .section {
      margin-bottom: var(--spacing-xl);
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-md);
    }
    .info-item {
      display: flex;
      flex-direction: column;
    }
    .info-item label {
      font-weight: 500;
      color: var(--text-secondary);
    }
    .table {
      width: 100%;
      margin-top: var(--spacing-md);
    }
    .not-graded {
      color: var(--text-secondary);
      font-style: italic;
    }
    .actions {
      display: flex;
      gap: var(--spacing-md);
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 4px;
      width: 400px;
    }
    .modal-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
  `]
})
export class StudentDetailComponent implements OnInit {
  student?: Student;
  availableCourses: Course[] = [];
  selectedCourse?: Course;
  newGrade?: number;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStudent(id);
    this.loadCourses();
  }

  loadStudent(id: number) {
    this.dataService.getStudent(id).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (error) => {
        console.error('Error loading student:', error);
      }
    });
  }

  loadCourses() {
    this.dataService.getCourses().subscribe({
      next: (courses) => {
        this.availableCourses = courses;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      }
    });
  }

  getStudentCourse(courseCode: string) {
    return this.student?.courses.find(c => c.code === courseCode);
  }

  openGradeModal(course: Course, isEditing = false) {
    this.selectedCourse = course;
    this.isEditing = isEditing;
    if (isEditing) {
      const existingGrade = this.getStudentCourse(course.code)?.grade?.percentage;
      this.newGrade = existingGrade;
    } else {
      this.newGrade = undefined;
    }
  }

  closeGradeModal() {
    this.selectedCourse = undefined;
    this.newGrade = undefined;
  }

  addGrade() {
    if (!this.student || !this.selectedCourse || this.newGrade === undefined) return;

    const letterGrade = this.calculateLetterGrade(this.newGrade);
    const updatedCourses = [...this.student.courses];
    const courseIndex = updatedCourses.findIndex(c => c.code === this.selectedCourse?.code);

    if (courseIndex === -1) {
      updatedCourses.push({
        code: this.selectedCourse.code,
        semester: this.selectedCourse.semester,
        grade: {
          percentage: this.newGrade,
          letter: letterGrade
        }
      });
    } else {
      updatedCourses[courseIndex].grade = {
        percentage: this.newGrade,
        letter: letterGrade
      };
    }

    const updatedStudent = { ...this.student, courses: updatedCourses };
    this.dataService.updateStudent(this.student.id, updatedStudent).subscribe({
      next: (student) => {
        this.student = student;
        this.closeGradeModal();
      },
      error: (error) => {
        console.error('Error updating grade:', error);
      }
    });
  }

  calculateLetterGrade(percentage: number): string {
    if (percentage >= 97) return 'A+';
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 63) return 'D';
    if (percentage >= 60) return 'D-';
    return 'F';
  }

  calculateAverageGrade(): string {
    if (!this.student) return 'N/A';
    
    const gradedCourses = this.student.courses.filter(course => course.grade);
    if (gradedCourses.length === 0) return 'N/A';
    
    const sum = gradedCourses.reduce((acc, course) => 
      acc + (course.grade?.percentage || 0), 0);
    return (sum / gradedCourses.length).toFixed(2) + '%';
  }

  calculateSuccessRate(): string {
    if (!this.student) return '0';
    
    const gradedCourses = this.student.courses.filter(course => course.grade);
    if (gradedCourses.length === 0) return '0';
    
    const passedCourses = gradedCourses.filter(course => 
      (course.grade?.percentage || 0) >= 60);
    return ((passedCourses.length / gradedCourses.length) * 100).toFixed(2);
  }

  editStudent() {
    if (this.student) {
      this.router.navigate(['/students', this.student.id, 'edit']);
    }
  }

  deleteStudent() {
    if (!this.student) return;

    if (confirm(`Are you sure you want to delete ${this.student.firstName} ${this.student.lastName}?`)) {
      this.dataService.deleteStudent(this.student.id).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          // TODO: Add error handling UI
        }
      });
    }
  }

  backToList() {
    this.router.navigate(['/students']);
  }

  removeGrade(course: Course) {
    if (!this.student) return;
    
    if (confirm('Are you sure you want to remove this grade?')) {
      const updatedCourses = this.student.courses.map(c => {
        if (c.code === course.code) {
          return { ...c, grade: undefined };
        }
        return c;
      });

      const updatedStudent = { ...this.student, courses: updatedCourses };
      this.dataService.updateStudent(this.student.id, updatedStudent).subscribe({
        next: (student) => {
          this.student = student;
        },
        error: (error) => {
          console.error('Error removing grade:', error);
        }
      });
    }
  }
}

export default StudentDetailComponent; 