import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-degrees-list',
  templateUrl: './degrees-list.component.html',
  styleUrls: ['./degrees-list.component.css']
})
export class DegreesListComponent implements OnInit {
  degrees: any[] = [];
  apiUrl = 'https://localhost:3000/degrees';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDegrees();
  }

  fetchDegrees() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.degrees = data;
      },
      (error) => {
        console.error('Error fetching degrees:', error);
      }
    );
  }
}
