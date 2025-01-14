import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-section">
            <div class="student-info">
              <span class="label">Student:</span>
              <span class="value highlight">Tristan Beason</span>
              <span class="separator">•</span>
              <span class="label">ID:</span>
              <span class="value highlight">5443</span>
              <a href="https://github.com/beasont" target="_blank" class="github-badge">
                <i class="fab fa-github"></i>
                <span>beasont</span>
              </a>
            </div>
          </div>

          <div class="footer-section">
            <div class="nav-links">
              <div class="nav-column">
                <a routerLink="/students">Students</a>
                <a routerLink="/courses">Courses</a>
                <a routerLink="/degrees">Degrees</a>
              </div>
              <div class="nav-column">
                <a routerLink="/statistics">Statistics</a>
                <a routerLink="/about">About</a>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="project-title">
            <span class="title-part">Student Records</span>
            <span class="separator">|</span>
            <span class="subtitle">Final Exam Assignment</span>
          </div>
          <p class="copyright">© 2025</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: rgba(26, 31, 37, 0.95);
      backdrop-filter: blur(10px);
      border-top: 1px solid var(--glass-border);
      padding: var(--spacing-xl) 0;
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-xl);
    }

    .footer-main {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: var(--spacing-xl);
      border-bottom: 1px solid var(--glass-border);
      margin-bottom: var(--spacing-xl);
    }

    .student-info {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
    }

    .label {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .value {
      color: var(--text-primary);
      font-weight: var(--font-weight-medium);
    }

    .separator {
      color: var(--text-secondary);
      margin: 0 var(--spacing-xs);
    }

    .github-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
      color: var(--text-primary);
      text-decoration: none;
      padding: 2px 8px;
      height: 20px;
      font-size: 0.75rem;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--border-radius-full);
      transition: all var(--transition-normal);
    }

    .github-badge i {
      font-size: 0.8rem;
      color: var(--accent);
    }

    .github-badge:hover {
      transform: translateY(-1px);
      border-color: var(--accent);
      box-shadow: var(--shadow-sm), var(--glow-accent);
    }

    .nav-links {
      display: flex;
      gap: var(--spacing-xl);
    }

    .nav-column {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .nav-column a {
      color: var(--text-primary);
      text-decoration: none;
      font-size: 0.9rem;
      transition: all var(--transition-normal);
      width: fit-content;
    }

    .nav-column a:hover {
      color: var(--accent);
      transform: translateX(3px);
    }

    .footer-bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .project-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-family: 'Montserrat', var(--font-primary);
    }

    .title-part {
      color: var(--accent);
      font-weight: var(--font-weight-bold);
      font-size: 1rem;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .subtitle {
      color: var(--text-primary);
      font-size: 0.9rem;
    }

    .copyright {
      color: var(--text-secondary);
      font-size: 0.8rem;
      margin: 0;
    }

    @media (max-width: 768px) {
      .footer-main {
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xl);
        text-align: center;
      }

      .nav-links {
        justify-content: center;
      }

      .student-info {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
} 