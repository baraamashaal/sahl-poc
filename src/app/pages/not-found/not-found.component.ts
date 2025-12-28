import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * 404 Not Found Page Component
 */
@Component({
  selector: 'mhr-not-found',
  template: `
    <div class="not-found-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <a routerLink="/" class="home-link">Go Home</a>
    </div>
  `,
  styles: [`
    .not-found-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
      padding: 24px;

      h1 {
        font-size: 72px;
        font-weight: 700;
        color: #1976d2;
        margin: 0;
      }

      h2 {
        font-size: 32px;
        color: #333;
        margin: 16px 0;
      }

      p {
        font-size: 16px;
        color: #666;
        margin: 0 0 32px 0;
      }

      .home-link {
        display: inline-block;
        padding: 12px 24px;
        background: #1976d2;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
        transition: background-color 0.2s;

        &:hover {
          background: #1565c0;
        }

        &:focus {
          outline: 2px solid #1976d2;
          outline-offset: 2px;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class NotFoundComponent {}
