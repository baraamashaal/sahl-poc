import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * TAWJEEH DOMAIN - Dashboard Feature - Dashboard Page View
 *
 * Main dashboard for Tawjeeh domain.
 * Location: domains/tawjeeh/features/dashboard/views/
 * Prefix: twj-
 */
@Component({
  selector: 'twj-dashboard-page-view',
  template: `
    <div class="tawjeeh-dashboard">
      <h1>🎯 Tawjeeh Dashboard</h1>
      <p class="subtitle">Welcome to the Tawjeeh domain</p>

      <div class="dashboard-grid">
        <a routerLink="/tawjeeh/employee" class="dashboard-card">
          <h2>👥 Employees</h2>
          <p>Manage Tawjeeh employees</p>
        </a>

        <div class="dashboard-card">
          <h2>📊 Reports</h2>
          <p>View Tawjeeh reports</p>
        </div>

        <div class="dashboard-card">
          <h2>⚙️ Settings</h2>
          <p>Configure Tawjeeh settings</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tawjeeh-dashboard {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    h1 {
      font-size: 36px;
      color: #333;
      margin: 0 0 8px 0;
    }

    .subtitle {
      font-size: 16px;
      color: #666;
      margin: 0 0 40px 0;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    .dashboard-card {
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      padding: 32px;
      text-decoration: none;
      transition: all 0.2s;

      &:hover {
        border-color: #1976d2;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        transform: translateY(-4px);
      }

      h2 {
        font-size: 24px;
        color: #1976d2;
        margin: 0 0 12px 0;
      }

      p {
        font-size: 14px;
        color: #666;
        margin: 0;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class DashboardPageView {}
