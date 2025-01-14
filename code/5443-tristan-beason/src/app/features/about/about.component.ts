import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <div class="about-card">
        <div class="profile-section">
          <div class="profile-header">
            <h1>Student Information</h1>
            <div class="underline"></div>
          </div>
          <div class="profile-content">
            <div class="info-group">
              <label>Name</label>
              <span>Tristan Beason</span>
            </div>
            <div class="info-group">
              <label>Student ID</label>
              <span>5443</span>
            </div>
            <div class="info-group">
              <label>Course</label>
              <span>Internet Programming</span>
            </div>
            <div class="github-section">
              <a href="https://github.com/beasont" target="_blank" class="github-link">
                <i class="fab fa-github"></i>
                <span>View My GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      min-height: 100vh;
      padding: var(--spacing-xl);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--bg-primary) 100%);
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .about-card {
      width: 100%;
      max-width: 800px;
      background: var(--bg-elevated);
      border-radius: var(--border-radius-lg);
      box-shadow: 
        var(--shadow-lg),
        0 0 20px rgba(0, 255, 208, 0.2),
        0 0 40px rgba(0, 255, 208, 0.1);
      overflow: hidden;
      transform-style: preserve-3d;
      transition: all var(--transition-normal);
      border: 1px solid var(--accent);
      backdrop-filter: blur(10px);
    }

    .about-card:hover {
      transform: translateY(-5px) rotateX(2deg) rotateY(2deg);
      box-shadow: 
        var(--shadow-xl),
        0 0 30px rgba(0, 255, 208, 0.3),
        0 0 60px rgba(0, 255, 208, 0.2);
    }

    .profile-section {
      padding: var(--spacing-xl);
    }

    .profile-header {
      margin-bottom: var(--spacing-xl);
      position: relative;
    }

    .profile-header h1 {
      font-size: 2.5rem;
      color: var(--primary);
      margin: 0;
      font-weight: var(--font-weight-bold);
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }

    .underline {
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 4px;
      background: var(--primary);
      border-radius: 2px;
      animation: expandWidth 0.5s ease-out forwards;
    }

    @keyframes expandWidth {
      from { width: 0; }
      to { width: 60px; }
    }

    .profile-content {
      display: grid;
      gap: var(--spacing-lg);
    }

    .info-group {
      display: grid;
      gap: var(--spacing-xs);
      padding: var(--spacing-md);
      background: var(--bg-secondary);
      border-radius: var(--border-radius-sm);
      transition: all 0.3s ease;
    }

    .info-group:hover {
      transform: translateX(10px);
      box-shadow: var(--shadow-md);
    }

    .info-group label {
      color: var(--text-secondary);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .info-group span {
      color: var(--text-primary);
      font-size: 1.2rem;
      font-weight: var(--font-weight-medium);
    }

    .github-section {
      margin-top: var(--spacing-lg);
      text-align: center;
    }

    .github-link {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md) var(--spacing-lg);
      background: var(--primary);
      color: var(--white);
      text-decoration: none;
      border-radius: var(--border-radius-full);
      font-weight: var(--font-weight-medium);
      transition: all 0.3s ease;
      box-shadow: var(--shadow-md);
    }

    .github-link:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
      background: var(--primary-dark);
    }

    .github-link i {
      font-size: 1.2rem;
    }

    @media (max-width: 768px) {
      .about-container {
        padding: var(--spacing-md);
      }

      .profile-header h1 {
        font-size: 2rem;
      }

      .info-group span {
        font-size: 1.1rem;
      }
    }
  `]
})
export class AboutComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationService.setTitle('About');
  }
} 