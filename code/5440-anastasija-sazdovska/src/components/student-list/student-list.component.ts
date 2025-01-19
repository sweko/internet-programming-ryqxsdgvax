import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  totalStudents: number = 0;
  searchTerm: string = '';
  selectedYear: number | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.apiService.getStudents().subscribe({
      next: (data: any) => {
        this.students = data;
        this.totalStudents = data.length;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load students. Please try again.';
        this.loading = false;
        console.error('Error fetching students:', error);
      }
    });
  }

  get filteredStudents() {
    return this.students.filter(student => {
      const matchesSearch = !this.searchTerm || 
        student.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesYear = !this.selectedYear || student.year === this.selectedYear;
      
      return matchesSearch && matchesYear;
    });
  }

  deleteStudent(id: number, event: Event): void {
    event.preventDefault();
    const studentToDelete = this.students.find(s => s.id === id);
    const confirmDialog = document.createElement('dialog');
    confirmDialog.classList.add('confirm-dialog');
    
    confirmDialog.innerHTML = `
      <div class="dialog-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete student ${studentToDelete?.firstName} ${studentToDelete?.lastName}?</p>
        <div class="dialog-actions">
          <button class="btn-secondary" onclick="this.closest('dialog').close('cancel')">Cancel</button>
          <button class="btn-danger" onclick="this.closest('dialog').close('confirm')">Delete</button>
        </div>
      </div>
    `;

    document.body.appendChild(confirmDialog);
    confirmDialog.showModal();

    confirmDialog.addEventListener('close', () => {
      if (confirmDialog.returnValue === 'confirm') {
        this.apiService.deleteStudent(id).subscribe({
          next: () => {
            this.loadStudents();
            this.showToast('Student deleted successfully');
          },
          error: (error) => {
            this.showToast('Failed to delete student', 'error');
            console.error('Error deleting student:', error);
          }
        });
      }
      document.body.removeChild(confirmDialog);
    });
  }

  private showToast(message: string, type: 'success' | 'error' = 'success') {
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 3000);
    }, 100);
  }
}