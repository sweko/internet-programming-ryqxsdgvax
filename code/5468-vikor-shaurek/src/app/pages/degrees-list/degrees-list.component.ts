import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-degrees',
  standalone: true,
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.css'],
})
export class DegreesComponent implements OnInit {
  degrees: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getDegrees().subscribe(
      (data) => (this.degrees = data),
      (error) => console.error('Error fetching degrees:', error)
    );
  }
}
