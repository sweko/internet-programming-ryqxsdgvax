import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatSortModule, MatPaginatorModule, MatTableModule],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements AfterViewInit {
  studentColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'degree', 'year','numOfCourses', 'action'];
  studentDataSource = new MatTableDataSource<Student>();
  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getStudents();
  }

  ngAfterViewInit() {
    this.studentDataSource.paginator = this.paginator;
    this.studentDataSource.sort = this.sort;

    merge(this.paginator.page, this.sort.sortChange)
      .pipe(tap(() => this.getStudents()))
      .subscribe();
  }

  getStudents(): void {
    this.studentService.fetchStudents().subscribe((data) => {
      this.totalItems = data.length;
      this.studentDataSource.data = data.slice(
        this.pageIndex * this.pageSize,
        this.pageIndex * this.pageSize + this.pageSize
      );
    });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.getStudents();
      });
    }
  }
}
