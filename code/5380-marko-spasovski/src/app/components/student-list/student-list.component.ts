import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DegreeService } from '../../services/degree.service';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit{

  students: Student[] = [];
  filteredStudents: Student[] = [];
  uniqueDegrees: string[] = [];
  filterForm: FormGroup = {} as unknown as FormGroup;;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  degrees: string[] = [];

  constructor(private studentService: StudentService, private formBuilder: FormBuilder, private degreeService: DegreeService){
    this.filterForm = this.formBuilder.group({
      name: [''],
      degree: [''],
      year: ['']
    }); // Ovoj moze da se napravi kd kje se zemev avtori tg da se kreira
  }


  ngOnInit(): void {
    this.loadStudents();
    this.getAvailableDegrees();
  }


  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (students: Student[]) => {
        this.students = students;
        this.filteredStudents = students;
      },
      error: (error) => console.error('Error loading students:', error)
    }
    );
  }


  onSubmit(): void {
    const filters = this.filterForm.value;
    this.filteredStudents = this.students.filter(student => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      return (
        (!filters.name || fullName.includes(filters.name.toLowerCase())) &&
        (!filters.degree || student.degree === filters.degree) &&
        (!filters.year || student.year.toString() === filters.year)
      );
    });
  }

  
  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredStudents.sort((a, b) => {
      const valueA = a[column as keyof Student];
      const valueB = b[column as keyof Student];

      if (valueA! < valueB!) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA! > valueB!) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }



  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(
        () => {
          this.students = this.students.filter(student => student.id !== id);
          this.filteredStudents = this.filteredStudents.filter(student => student.id !== id);
        },
        error => console.error('Error deleting student:', error)
      );
    }
  }

  getAvailableDegrees(){
    this.degreeService.getDegrees().subscribe(degrees => {
      this.degrees = degrees.map(degrees => degrees.code);
      console.log(this.degrees)
    });
  }

  getUniqueDegrees(): void {
    this.uniqueDegrees = [...new Set(this.students.map(student => student.degree))];
  }


  calculateAverageGrade(student: Student): number {
    const gradedCourses = student.courses?.filter(course => course.grade);
    if (!gradedCourses || gradedCourses.length === 0) return 0;
    const sum = gradedCourses.reduce((acc, course) => acc + (course.grade?.percentage || 0), 0);
    return Number((sum / gradedCourses.length).toFixed(2));
  }

    getNumberOfCourses(student: Student): number {
      return student.courses?.length || 0;
    }

    getNumberOfCoursesWithGrade(student: Student): number {
      return student.courses?.filter(course => course.grade).length || 0;
    }
  }


