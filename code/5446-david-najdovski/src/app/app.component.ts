import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule] // Add CommonModule and RouterModule here
})
export class AppComponent implements OnInit {
  currentYear: number = 0;
  welcomeMessage = 'Welcome to the Student Management System!';
  statusMessage = 'Checking data connection...';
  loading: boolean = true;

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.checkDataConnection();
  }

  checkDataConnection() {
    // Simulate a data connection check
    setTimeout(() => {
      this.loading = false;
      this.statusMessage = 'Data connection established.';
    }, 2000); // Simulate a 2-second delay
  }
}
