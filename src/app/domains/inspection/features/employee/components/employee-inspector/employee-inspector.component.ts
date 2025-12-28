import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Employee } from '@shared-kernel/employee/types/employee.model';

/**
 * INSPECTION DOMAIN - Employee Feature - Employee Inspector Component
 *
 * Presentational component for displaying employee details in inspection context.
 * Location: domains/inspection/features/employee/components/
 * Prefix: ins-
 */
@Component({
  selector: 'ins-employee-inspector',
  template: `
    <div class="employee-inspector">
      @if (employee(); as emp) {
        <div class="inspector-header">
          <h3>{{ emp.firstName }} {{ emp.lastName }}</h3>
          <span class="badge" [class.active]="emp.status === 'active'">
            {{ emp.status }}
          </span>
        </div>

        <div class="inspector-details">
          <div class="detail-row">
            <span class="label">Employee #:</span>
            <span class="value">{{ emp.employeeNumber }}</span>
          </div>

          <div class="detail-row">
            <span class="label">Email:</span>
            <span class="value">{{ emp.email }}</span>
          </div>

          <div class="detail-row">
            <span class="label">Department:</span>
            <span class="value">{{ emp.department }}</span>
          </div>

          <div class="detail-row">
            <span class="label">Position:</span>
            <span class="value">{{ emp.position }}</span>
          </div>

          <div class="detail-row">
            <span class="label">Hire Date:</span>
            <span class="value">{{ emp.hireDate | date }}</span>
          </div>
        </div>

        <div class="inspector-actions">
          <button
            class="btn btn-primary"
            (click)="inspectClicked.emit(emp)"
            type="button">
            Inspect Employee
          </button>

          <button
            class="btn btn-secondary"
            (click)="editClicked.emit(emp)"
            type="button">
            Edit
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .employee-inspector {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
    }

    .inspector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid #f5f5f5;

      h3 {
        margin: 0;
        font-size: 20px;
        color: #333;
      }
    }

    .badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      background: #e0e0e0;
      color: #666;

      &.active {
        background: #4caf50;
        color: white;
      }
    }

    .inspector-details {
      margin-bottom: 20px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f5f5f5;

      &:last-child {
        border-bottom: none;
      }
    }

    .label {
      font-weight: 500;
      color: #666;
    }

    .value {
      color: #333;
    }

    .inspector-actions {
      display: flex;
      gap: 12px;
    }

    .btn {
      flex: 1;
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      &:focus {
        outline: 2px solid #1976d2;
        outline-offset: 2px;
      }
    }

    .btn-primary {
      background: #1976d2;
      color: white;

      &:hover {
        background: #1565c0;
      }
    }

    .btn-secondary {
      background: white;
      color: #1976d2;
      border: 2px solid #1976d2;

      &:hover {
        background: #f5f5f5;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe]
})
export class EmployeeInspectorComponent {
  employee = input.required<Employee>();

  inspectClicked = output<Employee>();
  editClicked = output<Employee>();
}
