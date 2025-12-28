import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Employee } from '@shared-kernel/employee/types/employee.model';
import { EmployeeCardComponent } from '@shared-kernel/employee/components/employee-card/employee-card.component';

/**
 * TAWJEEH DOMAIN - Employee Feature - Employee List Component (Presentational)
 *
 * Displays list of employees using shared employee card.
 * Location: domains/tawjeeh/features/employee/components/
 * Prefix: twj-
 */
@Component({
  selector: 'twj-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmployeeCardComponent]
})
export class EmployeeListComponent {
  employees = input.required<Employee[]>();
  loading = input<boolean>(false);
  showDetails = input<boolean>(false);

  employeeSelected = output<Employee>();
  employeeAction = output<Employee>();

  onEmployeeSelected(employee: Employee) {
    this.employeeSelected.emit(employee);
  }

  onEmployeeAction(employee: Employee) {
    this.employeeAction.emit(employee);
  }

  trackByEmployeeId(index: number, employee: Employee): string {
    return employee.id;
  }
}
