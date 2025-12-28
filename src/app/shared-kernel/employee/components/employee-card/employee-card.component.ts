import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Employee } from '../../types/employee.model';

/**
 * SHARED KERNEL - Employee Card Component
 *
 * Reusable employee card component used across all domains.
 * This is a presentational component with NO business logic.
 *
 * Usage:
 * <mhr-employee-card
 *   [employee]="employee()"
 *   (selected)="onEmployeeSelected($event)"
 * />
 *
 * Domains can extend or wrap this component for domain-specific needs.
 */
@Component({
  selector: 'mhr-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCardComponent {
  /**
   * Employee data (required)
   */
  employee = input.required<Employee>();

  /**
   * Show detailed view (optional)
   */
  showDetails = input<boolean>(false);

  /**
   * Disable card interactions
   */
  disabled = input<boolean>(false);

  /**
   * Emitted when card is clicked
   */
  selected = output<Employee>();

  /**
   * Emitted when action button is clicked
   */
  actionClicked = output<Employee>();

  /**
   * Handle card click
   */
  onCardClick() {
    if (!this.disabled()) {
      this.selected.emit(this.employee());
    }
  }

  /**
   * Handle action button click
   */
  onActionClick(event: Event) {
    event.stopPropagation();
    if (!this.disabled()) {
      this.actionClicked.emit(this.employee());
    }
  }

  /**
   * Get employee full name
   */
  get fullName(): string {
    return `${this.employee().firstName} ${this.employee().lastName}`;
  }
}
