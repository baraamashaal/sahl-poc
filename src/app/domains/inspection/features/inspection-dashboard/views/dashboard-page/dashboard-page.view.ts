import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * INSPECTION DOMAIN - Dashboard Feature - Dashboard Page View
 *
 * Main dashboard for Inspection domain.
 * Location: domains/inspection/features/inspection-dashboard/views/
 * Prefix: ins-
 */
@Component({
  selector: 'ins-dashboard-page-view',
  template: `
    <div class="inspection-dashboard">
      <h1>🔍 Inspection Dashboard</h1>
      <p class="subtitle">Welcome to the Inspection domain</p>

      <div class="dashboard-grid">
        <a routerLink="/inspection/employee" class="dashboard-card">
          <h2>👥 Employees</h2>
          <p>Manage inspection employees</p>
        </a>

        <div class="dashboard-card">
          <h2>📋 Inspections</h2>
          <p>View and manage inspections</p>
        </div>

        <div class="dashboard-card">
          <h2>📊 Reports</h2>
          <p>View inspection reports</p>
        </div>

        <div class="dashboard-card">
          <h2>⚙️ Settings</h2>
          <p>Configure inspection settings</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .inspection-dashboard {
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
        border-color: #ff9800;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        transform: translateY(-4px);
      }

      h2 {
        font-size: 24px;
        color: #ff9800;
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
