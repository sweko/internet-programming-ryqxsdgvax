import { Component,ViewChild } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule,MatTableDataSource} from "@angular/material/table"
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort,MatSortModule } from '@angular/material/sort';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course',
  imports:[RouterModule,MatIconModule,MatSortModule,MatPaginatorModule,MatTableModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
    courseColumns: string[] = ['id', 'name', 'code', 'semester', 'yearOfStudy', 'action'];
    courseDataSource= new MatTableDataSource<Course>();
    pageSize = 10;
    pageIndex = 0;
    totalItems = 0;  // Initialize with 0

    constructor(private courseService: CourseService) {}

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
      this.getCourses();  // Fetch courses when the component is initialized
    }

    ngAfterViewInit() {
      this.courseDataSource.paginator = this.paginator;
      this.courseDataSource.sort = this.sort;

      merge(this.paginator.page, this.sort.sortChange)
        .pipe(tap(() => this.getCourses()))
        .subscribe();
    }

    // Fetch courses and update totalItems after the data is retrieved
    getCourses(): void {
      this.courseService.fetchDegrees().subscribe((data) => {
        this.totalItems = data.length;
        this.courseDataSource.data = data.slice(
          this.pageIndex * this.pageSize,
          this.pageIndex * this.pageSize + this.pageSize
        );
      });
    }

    deleteCourse(courseId:number):void{

    }
}
