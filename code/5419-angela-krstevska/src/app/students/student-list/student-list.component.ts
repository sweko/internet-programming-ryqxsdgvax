import { CommonModule } from '@angular/common';
import {Component, OnInit, AfterViewInit, ViewChild, signal} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {RouterLink} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import Swal from 'sweetalert2';
import {SwalService} from '../../services/swal.service';
import {Course, Degree, Student} from '../../../models/student';
import {StudentService} from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMiniFabButton,
    MatTooltip, MatIcon, MatAccordion, MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader, MatFormFieldModule, MatInput, MatSelect, MatCheckbox, RouterLink, MatOption, FormsModule, MatButton, ReactiveFormsModule
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit, AfterViewInit {
  readonly panelOpenState = signal(false);
  displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'studentId',
    'dateOfBirth',
    'email',
    'degree',
    'year',
    'numOfCourses',
    'action',
  ];
  years: number[]= [1,2,3,4];
  students: Student[] = [];
  degrees: Degree[] = [];
  filterValues = {
    student: '',
    degree: '',
    years: [] as number[]
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Student>([]);

  constructor(private studentService: StudentService, private _liveAnnouncer: LiveAnnouncer, private swalService: SwalService,) { }
  ngOnInit() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
      this.dataSource.data = students;
      this.filterStudents()
      console.log(this.dataSource);
    });
    this.studentService.getDegrees().subscribe(degrees => {
      this.degrees = degrees;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  filterStudents() {
    this.dataSource.filterPredicate = (data: Student, filter: string): boolean => {
      const filterObject = JSON.parse(filter);
      const matchesName = filterObject.student
        ? data.firstName.toLowerCase().includes(filterObject.student.toLowerCase()) ||
        data.lastName.toLowerCase().includes(filterObject.student.toLowerCase()) ||
        data.studentId.toString().includes(filterObject.student)
        : true;

      const matchesDegree = filterObject.degree
        ? data.degree?.toLowerCase() === filterObject.degree.toLowerCase()
        : true;

      const matchesYear = filterObject.years.length > 0
        ? filterObject.years.includes(data.year)
        : true;

      return matchesName && matchesDegree && matchesYear;
    };

    this.dataSource.filter = JSON.stringify(this.filterValues);
  }


  resetFilter() {
    this.filterValues.student = '';
    this.filterValues.degree = '';
    this.filterValues.years = [];
    this.filterStudents();

  }

  deleteStudent(studentId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this student?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      background: '#0F1414',
      color: '#efefef',
      confirmButtonColor: '#014F4F',
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(studentId).subscribe({
          next: () => {
            this.swalService.success('student deleted successfully!');
            this.dataSource.data = this.dataSource.data.filter(student => student.id !== studentId);
            this.filterStudents();
          },
          error: (error) => {
            this.swalService.error('Failed to delete student');
            console.error('Delete error', error);
          },
        });
      }
    });
  }

}
