import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dialog-container">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="dialog-actions">
        <button class="btn-secondary" (click)="close(false)">Cancel</button>
        <button class="btn-danger" (click)="close(true)">Delete</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: var(--spacing-lg);
      background: var(--white);
      border-radius: var(--radius-md);
      min-width: 300px;
    }
    
    h2 {
      margin: 0 0 var(--spacing-md);
      color: var(--text-primary);
    }
    
    p {
      margin: 0 0 var(--spacing-lg);
      color: var(--text-secondary);
    }
    
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-md);
    }
  `]
})
export class ConfirmDialogComponent {
  title = 'Confirm Delete';
  message = 'Are you sure you want to delete this item?';
  
  private dialogRef = inject(DialogRef);

  close(result: boolean): void {
    this.dialogRef.close(result);
  }
} 