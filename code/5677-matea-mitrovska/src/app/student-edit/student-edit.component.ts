import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent implements OnInit {
  editForm!: FormGroup;
  degrees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getStudentById(+id).subscribe((data: any) => {
        this.initializeForm(data);
      });
    }

    this.api.getDegrees().subscribe((degrees: any[]) => {
      this.degrees = degrees;
    });
  }

  initializeForm(student: any) {
    this.editForm = this.fb.group({
      firstName: [student.firstName, Validators.required],
      lastName: [student.lastName, Validators.required],
      email: [student.email, [Validators.required, Validators.email]],
      degree: [student.degree, Validators.required],
      year: [
        student.year,
        [Validators.required, Validators.min(1), Validators.max(4)],
      ],
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.api
          .updateStudent(+id, this.editForm.value)
          .subscribe(() => this.router.navigate([`/students/${id}`]));
      }
    }
  }
}
