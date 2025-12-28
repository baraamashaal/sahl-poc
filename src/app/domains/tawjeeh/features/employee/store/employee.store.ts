import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { Employee, EmployeeFilters } from '@shared-kernel/employee/types/employee.model';
import { EmployeeService } from '../services/employee.service';

/**
 * TAWJEEH DOMAIN - Employee Feature - Employee Store
 *
 * NgRx Signal Store for employee state management.
 * Location: domains/tawjeeh/features/employee/store/
 */

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string | null;
  filters: EmployeeFilters;
}

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
  filters: {}
};

export const EmployeeStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed(({ employees, filters }) => ({
    filteredEmployees: computed(() => {
      const currentEmployees = employees();
      const currentFilters = filters();

      return currentEmployees.filter(employee => {
        if (currentFilters.search) {
          const searchTerm = currentFilters.search.toLowerCase();
          const matchesSearch =
            employee.firstName.toLowerCase().includes(searchTerm) ||
            employee.lastName.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm) ||
            employee.employeeNumber.includes(searchTerm);
          if (!matchesSearch) return false;
        }

        if (currentFilters.department && employee.department !== currentFilters.department) {
          return false;
        }

        if (currentFilters.status && employee.status !== currentFilters.status) {
          return false;
        }

        return true;
      });
    }),

    totalCount: computed(() => employees().length),
    filteredCount: computed(() => {
      const currentEmployees = employees();
      const currentFilters = filters();
      return currentEmployees.filter(employee => {
        if (currentFilters.search) {
          const searchTerm = currentFilters.search.toLowerCase();
          if (!(employee.firstName.toLowerCase().includes(searchTerm) ||
                employee.lastName.toLowerCase().includes(searchTerm) ||
                employee.email.toLowerCase().includes(searchTerm))) {
            return false;
          }
        }
        if (currentFilters.department && employee.department !== currentFilters.department) return false;
        if (currentFilters.status && employee.status !== currentFilters.status) return false;
        return true;
      }).length;
    }),

    activeEmployees: computed(() =>
      employees().filter(emp => emp.status === 'active')
    )
  })),

  withMethods((store, employeeService = inject(EmployeeService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          employeeService.getAll().pipe(
            tap(employees => patchState(store, { employees, loading: false })),
            catchError(error => {
              patchState(store, {
                error: error.message || 'Failed to load employees',
                loading: false
              });
              return of([]);
            })
          )
        )
      )
    ),

    loadById: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(id =>
          employeeService.getById(id).pipe(
            tap(employee => patchState(store, { selectedEmployee: employee, loading: false })),
            catchError(error => {
              patchState(store, {
                error: error.message || 'Failed to load employee',
                loading: false
              });
              return of(null);
            })
          )
        )
      )
    ),

    updateFilters(filters: EmployeeFilters) {
      patchState(store, { filters });
    },

    clearFilters() {
      patchState(store, { filters: {} });
    },

    selectEmployee(employee: Employee | null) {
      patchState(store, { selectedEmployee: employee });
    },

    clearError() {
      patchState(store, { error: null });
    }
  }))
);
