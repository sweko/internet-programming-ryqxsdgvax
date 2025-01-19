import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../interfaces/student.model';

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
    student: Student | null = null;
    id: number = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private studentService: StudentService
    ) {}

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.fetchStudentDetails();
    }

    fetchStudentDetails(): void {
        this.studentService.getStudentById(this.id).subscribe(
            (data) => {
                this.student = data;
            },
            (error) => {
                console.error('Error fetching student details:', error);
            }
        );
    }

    deleteStudent(): void {
        if (confirm('Are you sure you want to delete this student?')) {
            this.studentService.deleteStudent(this.id).subscribe(
                () => {
                    alert('Student deleted successfully.');
                    this.router.navigate(['/students']);
                },
                (error) => {
                    console.error('Error deleting student:', error);
                }
            );
        }
    }

    goBack(): void {
        this.router.navigate(['/students']);
    }
}
