import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { DegreeService } from '../../services/degree.service';
import { Degree } from '../../interfaces/degree.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-student-create',
    templateUrl: './student-create.component.html',
    styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
    studentForm: FormGroup;
    degrees: Degree[] = [];

    constructor(
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
        this.fetchDegrees();
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

    saveStudent(): void {
        if (this.studentForm.valid) {
            this.studentService.createStudent(this.studentForm.value).subscribe(
                () => {
                    alert('Student created successfully.');
                    this.router.navigate(['/students']);
                },
                (error) => {
                    console.error('Error creating student:', error);
                }
            );
        } else {
            alert('Please fill out all required fields correctly.');
        }
    }

    cancel(): void {
        this.router.navigate(['/students']);
    }
}
