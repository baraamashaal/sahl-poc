import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../types/employee.model';

/**
 * SHARED-KERNEL - Employee Service
 *
 * Base employee service providing common HTTP operations.
 * Domains can extend this or use it directly.
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  protected http = inject(HttpClient);

  /**
   * Map API DTO to Employee model
   */
  protected mapToEmployee(dto: any): Employee {
    return {
      id: dto.id,
      employeeNumber: dto.employee_number || dto.employeeNumber,
      firstName: dto.first_name || dto.firstName,
      lastName: dto.last_name || dto.lastName,
      email: dto.email,
      phoneNumber: dto.phone_number || dto.phoneNumber,
      department: dto.department,
      position: dto.position,
      hireDate: new Date(dto.hire_date || dto.hireDate),
      status: dto.status,
      createdAt: new Date(dto.created_at || dto.createdAt),
      updatedAt: new Date(dto.updated_at || dto.updatedAt)
    };
  }

  /**
   * Map Employee model to API DTO
   */
  protected mapToDto(employee: Partial<Employee>): any {
    return {
      id: employee.id,
      employee_number: employee.employeeNumber,
      first_name: employee.firstName,
      last_name: employee.lastName,
      email: employee.email,
      phone_number: employee.phoneNumber,
      department: employee.department,
      position: employee.position,
      hire_date: employee.hireDate,
      status: employee.status,
      created_at: employee.createdAt?.toISOString(),
      updated_at: employee.updatedAt?.toISOString()
    };
  }
}
