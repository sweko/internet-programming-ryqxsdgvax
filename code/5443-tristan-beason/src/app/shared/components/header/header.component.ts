import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  path: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="nav-container">
        <div class="left-section">
          <div class="project-title">
            <span class="title-part">Student Records</span>
            <span class="separator">|</span>
            <span class="subtitle">Final Exam Assignment</span>
          </div>
        </div>
        <div class="center-section">
          <nav class="nav-links">
            @for (item of navItems; track item.path) {
              <a [routerLink]="item.path" routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                 class="nav-link">
                @if (item.icon) {
                  <i [class]="item.icon"></i>
                }
                {{ item.label }}
              </a>
            }
          </nav>
        </div>
        <div class="right-section">
          <div class="info-card">
            <div class="info-line">
              <span class="info-label">Student:</span>
              <span class="info-value">Tristan Beason, ID 5443</span>
            </div>
            <div class="info-line">
              <span class="info-label">Professor:</span>
              <span class="info-value">Wekoslav Stefanovski</span>
            </div>
            <div class="info-line">
              <span class="info-label">School:</span>
              <span class="info-value">UACS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--primary);
      padding: var(--spacing-sm) 0;
      box-shadow: var(--shadow-sm);
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand {
      text-decoration: none;
    }

    .brand h1 {
      color: var(--white);
      margin: 0;
      font-size: 1.5rem;
    }

    .nav-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: var(--spacing-md);
    }

    .nav-link {
      color: var(--light);
      text-decoration: none;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-sm);
      transition: all var(--transition-fast);
    }

    .nav-link:hover,
    .nav-link.active {
      background-color: var(--primary-light);
      color: var(--white);
    }

    .nav-link i {
      margin-right: var(--spacing-sm);
    }

    .project-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-family: 'Montserrat', var(--font-primary);
      background: var(--glass-bg);
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--border-radius-full);
      border: 1px solid var(--glass-border);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
    }

    .project-title:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg), var(--glow-accent);
    }

    .title-part {
      color: var(--accent);
      font-weight: var(--font-weight-bold);
      font-size: 1.1rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-shadow: 0 0 10px var(--accent);
    }

    .separator {
      color: var(--text-secondary);
      font-weight: var(--font-weight-light);
      margin: 0 var(--spacing-xs);
      opacity: 0.7;
    }

    .subtitle {
      color: var(--text-primary);
      font-weight: var(--font-weight-medium);
      font-size: 0.95rem;
      letter-spacing: 0.5px;
    }

    @keyframes glow {
      0% { text-shadow: 0 0 10px var(--accent); }
      50% { text-shadow: 0 0 20px var(--accent), 0 0 30px var(--accent); }
      100% { text-shadow: 0 0 10px var(--accent); }
    }

    .project-title:hover .title-part {
      animation: glow 2s infinite;
    }

    /* Make sure it's responsive */
    @media (max-width: 768px) {
      .project-title {
        font-size: 0.9rem;
        padding: var(--spacing-xs) var(--spacing-md);
      }

      .title-part {
        font-size: 1rem;
      }

      .subtitle {
        font-size: 0.85rem;
      }
    }

    .info-card {
      background: var(--glass-bg);
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--glass-border);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
      position: absolute;
      top: var(--spacing-sm);
      right: var(--spacing-lg);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      font-size: 0.85rem;
    }

    .info-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg), var(--glow-accent);
    }

    .info-line {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .info-label {
      color: var(--accent);
      font-weight: var(--font-weight-medium);
      text-shadow: 0 0 10px var(--accent);
    }

    .info-value {
      color: var(--text-primary);
    }

    /* Update nav-container to handle absolute positioning */
    .nav-container {
      position: relative;
      max-width: 1400px;
      margin: 0 auto;
      padding: var(--spacing-md) var(--spacing-lg);
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: var(--spacing-lg);
    }

    .left-section {
      justify-self: start;
    }

    .center-section {
      justify-self: center;
    }

    .right-section {
      justify-self: end;
    }

    .nav-links {
      display: flex;
      gap: var(--spacing-md);
    }

    .info-card {
      background: var(--glass-bg);
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--glass-border);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      font-size: 0.85rem;
    }

    /* Updated responsive design */
    @media (max-width: 1200px) {
      .nav-container {
        grid-template-columns: auto 1fr auto;
        gap: var(--spacing-md);
      }

      .info-card {
        font-size: 0.8rem;
        padding: var(--spacing-xs) var(--spacing-md);
      }
    }

    @media (max-width: 968px) {
      .nav-container {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        gap: var(--spacing-md);
      }

      .left-section,
      .center-section,
      .right-section {
        justify-self: center;
      }

      .nav-links {
        flex-wrap: wrap;
        justify-content: center;
      }

      .info-card {
        width: 100%;
        text-align: center;
      }

      .info-line {
        justify-content: center;
      }
    }
  `]
})
export class HeaderComponent {
  navItems: NavItem[] = [
    { path: '/students', label: 'Students' },
    { path: '/degrees', label: 'Degrees' },
    { path: '/courses', label: 'Courses' },
    { path: '/statistics', label: 'Statistics' }
  ];
} 