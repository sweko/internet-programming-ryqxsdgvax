import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../interfaces/student.model';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
    students: Student[] = [];
    totalStudents: number = 0;
    currentPage: number = 1;
    itemsPerPage: number = 10;

    constructor(private studentService: StudentService) {}

    ngOnInit(): void {
        this.fetchStudents();
    }

    fetchStudents(): void {
        this.studentService.getStudents().subscribe(
            (data) => {
                this.students = data;
                this.totalStudents = data.length;
            },
            (error) => {
                console.error('Error fetching students:', error);
            }
        );
    }

    deleteStudent(id: number): void {
        if (confirm('Are you sure you want to delete this student?')) {
            this.studentService.deleteStudent(id).subscribe(
                () => {
                    this.students = this.students.filter((student) => student.id !== id);
                    this.totalStudents--;
                },
                (error) => {
                    console.error('Error deleting student:', error);
                }
            );
        }
    }
}
