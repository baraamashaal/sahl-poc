/**
 * SHARED KERNEL - Employee Feature
 * Public API for employee functionality
 *
 * This barrel export makes it easy for domains to import shared employee functionality:
 *
 * import { Employee, EmployeeCardComponent, EmployeeService } from '@shared-kernel/employee';
 */

// Types
export * from './types/employee.model';

// Components
export * from './components/employee-card/employee-card.component';

// Services
export * from './services/employee.service';
