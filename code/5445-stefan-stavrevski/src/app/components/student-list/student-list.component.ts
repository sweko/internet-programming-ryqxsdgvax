import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  paginatedStudents: any[] = [];
  degrees: any[] = [];
  filters = {
    nameOrId: '',
    degree: '',
    year: '',
  };
  nameDisplayFormat: 'firstLast' | 'lastFirst' = 'firstLast';
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.fetchStudents();
    this.fetchDegrees();
  }

  fetchStudents() {
    this.apiService.getStudents().subscribe((data) => {
      this.students = data.map((student: any) => {
        // Calculate average grade based on courses
        const gradedCourses = student.courses.filter(
          (course: any) => course.grade
        );
        const averageGrade = gradedCourses.length
          ? Math.round(
              gradedCourses.reduce(
                (sum: number, course: any) => sum + course.grade.percentage,
                0
              ) / gradedCourses.length
            )
          : null;
        return { ...student, averageGrade };
      });
      this.applyFilters();
    });
  }

  fetchDegrees() {
    this.apiService.getDegrees().subscribe((data) => {
      this.degrees = data;
    });
  }

  applyFilters() {
    this.filteredStudents = this.students.filter((student) => {
      const name = this.formatName(student).toLowerCase();
      const id = student.studentId.toLowerCase();
      const filter = this.filters.nameOrId.toLowerCase();

      return (
        (!this.filters.nameOrId ||
          name.includes(filter) ||
          id.includes(filter)) &&
        (!this.filters.degree || student.degree === this.filters.degree) &&
        (!this.filters.year || student.year === +this.filters.year)
      );
    });

    this.sortBy('studentId');
    this.paginate();
  }

  paginate() {
    this.totalPages = Math.ceil(
      this.filteredStudents.length / this.itemsPerPage
    );
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedStudents = this.filteredStudents.slice(
      start,
      start + this.itemsPerPage
    );
  }

  sortBy(field: keyof (typeof this.students)[0]) {
    const direction =
      this.filters[field as keyof typeof this.filters] === 'asc'
        ? 'desc'
        : 'asc';
    this.filteredStudents.sort((a, b) =>
      direction === 'asc'
        ? a[field]?.localeCompare(b[field])
        : b[field]?.localeCompare(a[field])
    );
    this.paginate();
  }

  formatName(student: any): string {
    return this.nameDisplayFormat === 'firstLast'
      ? `${student.firstName} ${student.lastName}`
      : `${student.lastName}, ${student.firstName}`;
  }

  viewStudent(id: number) {
    this.router.navigate(['/students', id]);
  }

  editStudent(id: number) {
    this.router.navigate(['/students', id, 'edit']);
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.apiService.deleteStudent(id).subscribe(() => {
        this.fetchStudents(); // Refresh the list after deletion
      });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }
}
