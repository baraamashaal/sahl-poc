import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Employee } from '@shared-kernel/employee/types/employee.model';
import { EmployeeService } from '../services/employee.service';

/**
 * INSPECTION DOMAIN - Employee Feature Store
 *
 * NgRx Signal Store for managing employee state within Inspection domain.
 * Location: domains/inspection/features/employee/store/
 */
interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string | null;
  filters: {
    searchTerm: string;
    department: string | null;
    status: string | null;
  };
}

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
  filters: {
    searchTerm: '',
    department: null,
    status: null
  }
};

export const EmployeeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ employees, filters }) => ({
    filteredEmployees: computed(() => {
      let result = employees();
      const { searchTerm, department, status } = filters();

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(emp =>
          emp.firstName.toLowerCase().includes(term) ||
          emp.lastName.toLowerCase().includes(term) ||
          emp.employeeNumber.toLowerCase().includes(term) ||
          emp.email.toLowerCase().includes(term)
        );
      }

      if (department) {
        result = result.filter(emp => emp.department === department);
      }

      if (status) {
        result = result.filter(emp => emp.status === status);
      }

      return result;
    }),
    totalCount: computed(() => employees().length),
    filteredCount: computed(() => {
      let result = employees();
      const { searchTerm, department, status } = filters();

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(emp =>
          emp.firstName.toLowerCase().includes(term) ||
          emp.lastName.toLowerCase().includes(term) ||
          emp.employeeNumber.toLowerCase().includes(term) ||
          emp.email.toLowerCase().includes(term)
        );
      }

      if (department) {
        result = result.filter(emp => emp.department === department);
      }

      if (status) {
        result = result.filter(emp => emp.status === status);
      }

      return result.length;
    })
  })),
  withMethods((store, employeeService = inject(EmployeeService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() => employeeService.getAll().pipe(
          tap({
            next: (employees) => patchState(store, { employees, loading: false }),
            error: (error) => patchState(store, { error: error.message, loading: false })
          })
        ))
      )
    ),
    loadById: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) => employeeService.getById(id).pipe(
          tap({
            next: (employee) => patchState(store, { selectedEmployee: employee, loading: false }),
            error: (error) => patchState(store, { error: error.message, loading: false })
          })
        ))
      )
    ),
    create: rxMethod<Partial<Employee>>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((employee) => employeeService.create(employee).pipe(
          tap({
            next: (newEmployee) => {
              const employees = [...store.employees(), newEmployee];
              patchState(store, { employees, loading: false });
            },
            error: (error) => patchState(store, { error: error.message, loading: false })
          })
        ))
      )
    ),
    update: rxMethod<{ id: string; employee: Partial<Employee> }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ id, employee }) => employeeService.update(id, employee).pipe(
          tap({
            next: (updatedEmployee) => {
              const employees = store.employees().map(emp =>
                emp.id === id ? updatedEmployee : emp
              );
              patchState(store, { employees, loading: false });
            },
            error: (error) => patchState(store, { error: error.message, loading: false })
          })
        ))
      )
    ),
    delete: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) => employeeService.delete(id).pipe(
          tap({
            next: () => {
              const employees = store.employees().filter(emp => emp.id !== id);
              patchState(store, { employees, loading: false });
            },
            error: (error) => patchState(store, { error: error.message, loading: false })
          })
        ))
      )
    ),
    setFilters(filters: Partial<EmployeeState['filters']>): void {
      patchState(store, { filters: { ...store.filters(), ...filters } });
    },
    clearFilters(): void {
      patchState(store, { filters: initialState.filters });
    },
    selectEmployee(employee: Employee | null): void {
      patchState(store, { selectedEmployee: employee });
    }
  }))
);
