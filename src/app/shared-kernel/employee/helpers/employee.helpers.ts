import { Employee, EmployeeStatus } from '../types/employee.model';

/**
 * SHARED-KERNEL - Employee Feature Helpers
 *
 * Shared utility functions for employee operations.
 * Location: shared-kernel/employee/helpers/
 */

/**
 * Get employee's full name
 */
export function getEmployeeFullName(employee: Employee): string {
  return `${employee.firstName} ${employee.lastName}`;
}

/**
 * Get employee's full information string
 */
export function getEmployeeDisplayInfo(employee: Employee): string {
  return `${employee.employeeNumber} - ${getEmployeeFullName(employee)} (${employee.department})`;
}

/**
 * Check if employee is active
 */
export function isEmployeeActive(employee: Employee): boolean {
  return employee.status === EmployeeStatus.Active;
}

/**
 * Get status badge color
 */
export function getStatusBadgeColor(status: EmployeeStatus): string {
  switch (status) {
    case EmployeeStatus.Active:
      return '#4caf50';
    case EmployeeStatus.Inactive:
      return '#9e9e9e';
    case EmployeeStatus.OnLeave:
      return '#ff9800';
    case EmployeeStatus.Suspended:
      return '#f44336';
    default:
      return '#9e9e9e';
  }
}

/**
 * Format employee number with padding
 */
export function formatEmployeeNumber(employeeNumber: string, length: number = 6): string {
  return employeeNumber.padStart(length, '0');
}

/**
 * Search employees by term
 */
export function searchEmployees(employees: Employee[], searchTerm: string): Employee[] {
  if (!searchTerm) {
    return employees;
  }

  const term = searchTerm.toLowerCase().trim();
  return employees.filter(emp =>
    emp.firstName.toLowerCase().includes(term) ||
    emp.lastName.toLowerCase().includes(term) ||
    emp.employeeNumber.toLowerCase().includes(term) ||
    emp.email.toLowerCase().includes(term) ||
    emp.department.toLowerCase().includes(term) ||
    emp.position.toLowerCase().includes(term)
  );
}

/**
 * Filter employees by department
 */
export function filterByDepartment(employees: Employee[], department: string): Employee[] {
  if (!department) {
    return employees;
  }
  return employees.filter(emp => emp.department === department);
}

/**
 * Filter employees by status
 */
export function filterByStatus(employees: Employee[], status: EmployeeStatus): Employee[] {
  if (!status) {
    return employees;
  }
  return employees.filter(emp => emp.status === status);
}

/**
 * Get unique departments from employee list
 */
export function getUniqueDepartments(employees: Employee[]): string[] {
  return [...new Set(employees.map(emp => emp.department))].sort();
}

/**
 * Sort employees by name
 */
export function sortEmployeesByName(employees: Employee[], ascending: boolean = true): Employee[] {
  return [...employees].sort((a, b) => {
    const nameA = getEmployeeFullName(a).toLowerCase();
    const nameB = getEmployeeFullName(b).toLowerCase();
    return ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });
}

/**
 * Sort employees by employee number
 */
export function sortEmployeesByNumber(employees: Employee[], ascending: boolean = true): Employee[] {
  return [...employees].sort((a, b) => {
    return ascending
      ? a.employeeNumber.localeCompare(b.employeeNumber)
      : b.employeeNumber.localeCompare(a.employeeNumber);
  });
}
