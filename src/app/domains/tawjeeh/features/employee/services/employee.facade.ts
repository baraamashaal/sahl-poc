import { Injectable, inject, Signal } from '@angular/core';
import { Employee, EmployeeFilters } from '@shared-kernel/employee/types/employee.model';
import { EmployeeStore } from '../store/employee.store';
import { EmployeeService } from './employee.service';

/**
 * TAWJEEH DOMAIN - Employee Feature - Employee Facade
 *
 * Facade providing clean interface for employee operations.
 * Wraps EmployeeStore + EmployeeService.
 * Location: domains/tawjeeh/features/employee/services/
 *
 * Usage in views:
 * ```typescript
 * private facade = inject(EmployeeFacade);
 * employees = this.facade.filteredEmployees;
 *
 * ngOnInit() {
 *   this.facade.loadAll();
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeFacade {
  private store = inject(EmployeeStore);
  private service = inject(EmployeeService);

  // State selectors
  get employees(): Signal<Employee[]> {
    return this.store.employees;
  }

  get filteredEmployees(): Signal<Employee[]> {
    return this.store.filteredEmployees;
  }

  get selectedEmployee(): Signal<Employee | null> {
    return this.store.selectedEmployee;
  }

  get loading(): Signal<boolean> {
    return this.store.loading;
  }

  get error(): Signal<string | null> {
    return this.store.error;
  }

  get filters(): Signal<EmployeeFilters> {
    return this.store.filters;
  }

  get totalCount(): Signal<number> {
    return this.store.totalCount;
  }

  get filteredCount(): Signal<number> {
    return this.store.filteredCount;
  }

  get activeEmployees(): Signal<Employee[]> {
    return this.store.activeEmployees;
  }

  // Actions
  loadAll(): void {
    this.store.loadAll();
  }

  loadById(id: string): void {
    this.store.loadById(id);
  }

  updateFilters(filters: EmployeeFilters): void {
    this.store.updateFilters(filters);
  }

  clearFilters(): void {
    this.store.clearFilters();
  }

  selectEmployee(employee: Employee | null): void {
    this.store.selectEmployee(employee);
  }

  clearError(): void {
    this.store.clearError();
  }

  // Business logic helpers
  searchEmployees(searchTerm: string): void {
    this.updateFilters({ ...this.filters(), search: searchTerm });
  }

  filterByDepartment(department: string): void {
    this.updateFilters({ ...this.filters(), department });
  }

  resetAndReload(): void {
    this.clearFilters();
    this.clearError();
    this.loadAll();
  }

  getEmployeeDisplayName(employee: Employee): string {
    return `${employee.firstName} ${employee.lastName} (${employee.employeeNumber})`;
  }

  isEmployeeActive(employee: Employee): boolean {
    return employee.status === 'active';
  }
}
