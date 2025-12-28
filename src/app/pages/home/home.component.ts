import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Home Page Component
 */
@Component({
  selector: 'mhr-home',
  template: `
    <div class="home-page">
      <h1>Ministry of Human Resources (MHR)</h1>
      <h2 class="subtitle">Multi-Domain Application Platform</h2>

      <p class="description">
        This application consolidates 10 separate applications into one unified platform using:
      </p>
      <ul class="features">
        <li><strong>Shared Kernel Pattern</strong> - Common employee logic across domains</li>
        <li><strong>Domain-Driven Design</strong> - Each app is an independent domain</li>
        <li><strong>Signal-Based State</strong> - Modern reactive state management</li>
        <li><strong>Georgebyte Pattern</strong> - Each domain follows proven architecture</li>
      </ul>

      <nav class="domains">
        <h2>🏢 Application Domains</h2>
        <div class="domain-grid">
          <a routerLink="/tawjeeh" class="domain-card tawjeeh">
            <div class="domain-icon">🎯</div>
            <h3>Tawjeeh</h3>
            <p class="domain-prefix">Prefix: twj-</p>
            <p>Employee guidance and orientation</p>
          </a>

          <a routerLink="/inspection" class="domain-card inspection">
            <div class="domain-icon">🔍</div>
            <h3>Inspection</h3>
            <p class="domain-prefix">Prefix: ins-</p>
            <p>Employee inspection and compliance</p>
          </a>

          <div class="domain-card placeholder">
            <div class="domain-icon">🏠</div>
            <h3>Labour Accommodation</h3>
            <p class="domain-prefix">Prefix: lab-</p>
            <p>Coming soon...</p>
          </div>

          <div class="domain-card placeholder">
            <div class="domain-icon">➕</div>
            <h3>7 More Domains</h3>
            <p class="domain-prefix">To be implemented</p>
            <p>Your remaining applications</p>
          </div>
        </div>
      </nav>
    </div>
  `,
  styles: [`
    .home-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 24px;
      text-align: center;
    }

    h1 {
      font-size: 48px;
      font-weight: 700;
      color: #1976d2;
      margin: 0 0 16px 0;
    }

    .subtitle {
      font-size: 24px;
      font-weight: 400;
      color: #666;
      margin: 0 0 40px 0;
    }

    .description {
      font-size: 18px;
      color: #666;
      margin-bottom: 16px;
      text-align: left;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .features {
      list-style: none;
      padding: 0;
      margin: 0 0 60px 0;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      text-align: left;

      li {
        padding: 12px 0;
        font-size: 16px;
        color: #666;
        border-bottom: 1px solid #e0e0e0;

        strong {
          color: #1976d2;
        }
      }
    }

    .domains {
      margin-top: 60px;

      h2 {
        font-size: 32px;
        color: #333;
        margin-bottom: 32px;
      }
    }

    .domain-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      text-align: left;
    }

    .domain-card {
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      padding: 32px;
      text-decoration: none;
      transition: all 0.3s;
      display: block;

      &:hover:not(.placeholder) {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
      }

      &.tawjeeh:hover {
        border-color: #1976d2;
      }

      &.inspection:hover {
        border-color: #388e3c;
      }

      &.placeholder {
        opacity: 0.6;
        cursor: default;
      }

      .domain-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }

      h3 {
        font-size: 24px;
        color: #333;
        margin: 0 0 8px 0;
      }

      .domain-prefix {
        font-size: 12px;
        font-weight: 600;
        color: #1976d2;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0 0 12px 0;
      }

      p:last-child {
        font-size: 14px;
        color: #666;
        margin: 0;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class HomeComponent {}
