import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-degrees',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="degrees-container">
      <h1>Degrees</h1>
    </div>
  `,
  styles: [`
    .degrees-container {
      padding: 20px;
    }
  `]
})
export class DegreesComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService.setTitle('Degrees');
  }
} 