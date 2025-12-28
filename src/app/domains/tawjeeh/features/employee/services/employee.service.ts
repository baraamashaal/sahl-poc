import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '@shared-kernel/employee/types/employee.model';

/**
 * TAWJEEH DOMAIN - Employee Feature - Employee Service
 *
 * Handles HTTP operations for employee data in Tawjeeh domain.
 * Location: domains/tawjeeh/features/employee/services/
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private readonly apiUrl = '/api/tawjeeh/employees';

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
    const dto = this.mapToDto(employee as Employee);
    return this.http.post<any>(this.apiUrl, dto).pipe(
      map(responseDto => this.mapToEmployee(responseDto))
    );
  }

  update(id: string, employee: Partial<Employee>): Observable<Employee> {
    const dto = this.mapToDto(employee as Employee);
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto).pipe(
      map(responseDto => this.mapToEmployee(responseDto))
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapToEmployee(dto: any): Employee {
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

  private mapToDto(employee: Employee): any {
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
      created_at: employee.createdAt.toISOString(),
      updated_at: employee.updatedAt.toISOString()
    };
  }
}
