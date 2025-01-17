import {Component, ViewChild} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Course, Student} from '../../../models/student';
import {map, Subscription, switchMap} from 'rxjs';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import {SwalService} from '../../services/swal.service';
import {StudentService} from '../../services/student.service';

@Component({
  selector: 'app-student-details',
  imports: [
    MatCardModule,
    MatButton, MatIcon, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatPaginator, RouterLink, MatNoDataRow
  ],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent {
  student: Student | undefined;
  courses: Course[] | undefined;
  subscription?: Subscription;
  displayedColumns = [
    'code',
    'grade',
    'semester',
    'status'
  ];
  dataSource = new MatTableDataSource<Course>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private route: ActivatedRoute, private studentsService: StudentService, private router: Router, private swalService: SwalService) { }

  ngOnInit() {
    this.subscription = this.route.params.pipe(
      map(params => Number(params['id'])),
      switchMap(studentId => this.studentsService.getStudentById(studentId))
    ).subscribe(student => {
      this.student = student;
      this.courses = student.courses;
      this.dataSource.data = this.courses;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteStudent(studentId: number | undefined) {
    if (!studentId) {
      Swal.fire({
        title: 'Error',
        text: 'Invalid student ID. Unable to delete student.',
        icon: 'error',
        background: '#0F1414',
        color: '#efefef',
        confirmButtonColor: '#014F4F',
      });
      return;
    }
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
        this.studentsService.deleteStudent(studentId).subscribe({
          next: () => {
            this.swalService.success('Student deleted successfully!');
            this.router.navigate(['/students']);
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
