import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { DegreeService } from '../../services/degree.service';
import { Student } from '../../interfaces/student.model';
import { Degree } from '../../interfaces/degree.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-student-edit',
    templateUrl: './student-edit.component.html',
    styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
    studentForm: FormGroup;
    degrees: Degree[] = [];
    id: number = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private studentService: StudentService,
        private degreeService: DegreeService,
        private fb: FormBuilder
    ) {
        this.studentForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            degree: ['', Validators.required],
            year: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
        });
    }

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.fetchDegrees();
        this.fetchStudentDetails();
    }

    fetchDegrees(): void {
        this.degreeService.getDegrees().subscribe(
            (data) => {
                this.degrees = data;
            },
            (error) => {
                console.error('Error fetching degrees:', error);
            }
        );
    }

    fetchStudentDetails(): void {
        this.studentService.getStudentById(this.id).subscribe(
            (data) => {
                this.studentForm.patchValue({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    degree: data.degree,
                    year: data.year,
                });
            },
            (error) => {
                console.error('Error fetching student details:', error);
            }
        );
    }

    saveStudent(): void {
        if (this.studentForm.valid) {
            this.studentService.updateStudent(this.id, this.studentForm.value).subscribe(
                () => {
                    alert('Student updated successfully.');
                    this.router.navigate(['/students', this.id]);
                },
                (error) => {
                    console.error('Error updating student:', error);
                }
            );
        } else {
            alert('Please fill out all required fields correctly.');
        }
    }

    cancel(): void {
        this.router.navigate(['/students', this.id]);
    }
}
