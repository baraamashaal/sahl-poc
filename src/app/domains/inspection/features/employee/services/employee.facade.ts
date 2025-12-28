import { Injectable, Signal, inject } from '@angular/core';
import { Employee } from '@shared-kernel/employee/types/employee.model';
import { EmployeeStore } from '../store/employee.store';
import { EmployeeService } from './employee.service';

/**
 * INSPECTION DOMAIN - Employee Feature Facade
 *
 * Provides a simplified interface for employee operations.
 * Wraps both the store and service to provide a single entry point.
 * Location: domains/inspection/features/employee/services/
 */
@Injectable({ providedIn: 'root' })
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

  get totalCount(): Signal<number> {
    return this.store.totalCount;
  }

  get filteredCount(): Signal<number> {
    return this.store.filteredCount;
  }

  // Actions
  loadAll(): void {
    this.store.loadAll();
  }

  loadById(id: string): void {
    this.store.loadById(id);
  }

  create(employee: Partial<Employee>): void {
    this.store.create(employee);
  }

  update(id: string, employee: Partial<Employee>): void {
    this.store.update({ id, employee });
  }

  delete(id: string): void {
    this.store.delete(id);
  }

  setFilters(filters: { searchTerm?: string; department?: string | null; status?: string | null }): void {
    this.store.setFilters(filters);
  }

  clearFilters(): void {
    this.store.clearFilters();
  }

  selectEmployee(employee: Employee | null): void {
    this.store.selectEmployee(employee);
  }

  // Business logic helpers
  getEmployeeDisplayName(employee: Employee): string {
    return `${employee.firstName} ${employee.lastName}`;
  }

  getEmployeeFullInfo(employee: Employee): string {
    return `${employee.employeeNumber} - ${this.getEmployeeDisplayName(employee)} (${employee.department})`;
  }

  isEmployeeActive(employee: Employee): boolean {
    return employee.status === 'active';
  }

  canDeleteEmployee(employee: Employee): boolean {
    return employee.status !== 'active';
  }
}
