import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { EmployeeFacade } from '../../services/employee.facade';
import { EmployeeInspectorComponent } from '../../components/employee-inspector/employee-inspector.component';
import { Employee } from '@shared-kernel/employee/types/employee.model';

/**
 * INSPECTION DOMAIN - Employee Feature - Employee Page View
 *
 * Main employee management page for Inspection domain.
 * Location: domains/inspection/features/employee/views/
 * Prefix: ins-
 */
@Component({
  selector: 'ins-employee-page-view',
  templateUrl: './employee-page.view.html',
  styleUrl: './employee-page.view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmployeeInspectorComponent]
})
export class EmployeePageView implements OnInit {
  private facade = inject(EmployeeFacade);

  employees = this.facade.filteredEmployees;
  loading = this.facade.loading;
  error = this.facade.error;
  selectedEmployee = this.facade.selectedEmployee;

  ngOnInit(): void {
    this.facade.loadAll();
  }

  onInspectEmployee(employee: Employee): void {
    console.log('Inspecting employee:', employee);
    this.facade.selectEmployee(employee);
  }

  onEditEmployee(employee: Employee): void {
    console.log('Editing employee:', employee);
  }

  onSearchChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.facade.setFilters({ searchTerm });
  }

  onRetry(): void {
    this.facade.loadAll();
  }
}
