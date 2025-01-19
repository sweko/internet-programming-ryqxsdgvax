import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `
        <header>
            <nav>
                <a routerLink="/students" routerLinkActive="active">Students</a>
                <a routerLink="/statistics" routerLinkActive="active">Statistics</a>
                <a routerLink="/about" routerLinkActive="active">About</a>
            </nav>
        </header>
        <main>
            <router-outlet></router-outlet>
        </main>
        <footer>
            &copy; {{ currentYear }} Student Management App
        </footer>
    `,
    styles: [
        `
        header {
            background-color: #f4f4f4;
            padding: 10px;
        }
        nav a {
            margin-right: 15px;
            text-decoration: none;
            color: #007bff;
        }
        nav a.active {
            font-weight: bold;
        }
        footer {
            margin-top: 20px;
            text-align: center;
        }
        `
    ],
    imports: [RouterModule] // Add RouterModule here
})
export class AppComponent {
    currentYear: number = new Date().getFullYear();
}
