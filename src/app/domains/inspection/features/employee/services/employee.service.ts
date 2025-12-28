import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeService as BaseEmployeeService } from '@shared-kernel/employee/services/employee.service';
import { Employee } from '@shared-kernel/employee/types/employee.model';

/**
 * INSPECTION DOMAIN - Employee Feature Service
 *
 * Handles HTTP operations for employee management within Inspection domain.
 * Location: domains/inspection/features/employee/services/
 */
@Injectable({ providedIn: 'root' })
export class EmployeeService extends BaseEmployeeService {
  private readonly apiUrl = '/api/inspection/employees';

  getAll(): Observable<Employee[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(dtos => dtos.map(dto => this.mapToEmployee(dto)))
    );
  }

  getById(id: string): Observable<Employee> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(dto => this.mapToEmployee(dto))
    );
  }

  create(employee: Partial<Employee>): Observable<Employee> {
    return this.http.post<any>(this.apiUrl, this.mapToDto(employee)).pipe(
      map(dto => this.mapToEmployee(dto))
    );
  }

  update(id: string, employee: Partial<Employee>): Observable<Employee> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, this.mapToDto(employee)).pipe(
      map(dto => this.mapToEmployee(dto))
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  protected override mapToDto(employee: Partial<Employee>): any {
    return {
      employee_number: employee.employeeNumber,
      first_name: employee.firstName,
      last_name: employee.lastName,
      email: employee.email,
      phone_number: employee.phoneNumber,
      department: employee.department,
      position: employee.position,
      hire_date: employee.hireDate,
      status: employee.status
    };
  }
}
