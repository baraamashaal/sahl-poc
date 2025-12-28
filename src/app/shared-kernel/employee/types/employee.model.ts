/**
 * SHARED KERNEL - Employee Model
 *
 * This model is shared across multiple domains (bounded contexts):
 * - Tawjeeh
 * - Inspection
 * - Labour Accommodation
 * - ... and 7 more domains
 *
 * In DDD, this is part of the "Shared Kernel" pattern.
 * All domains agree to use this common employee model.
 */

export interface Employee {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  position: string;
  hireDate: Date;
  status: EmployeeStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum EmployeeStatus {
  Active = 'active',
  Inactive = 'inactive',
  OnLeave = 'on_leave',
  Suspended = 'suspended'
}

/**
 * Employee filter criteria
 * Used for filtering employee lists across all domains
 */
export interface EmployeeFilters {
  search?: string;
  department?: string;
  status?: EmployeeStatus;
}

/**
 * Employee summary (lightweight version)
 * Used for lists and cards
 */
export interface EmployeeSummary {
  id: string;
  employeeNumber: string;
  fullName: string;
  department: string;
  status: EmployeeStatus;
}
