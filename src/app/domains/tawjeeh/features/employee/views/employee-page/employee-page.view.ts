import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeFacade } from '../../services/employee.facade';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { Employee } from '@shared-kernel/employee/types/employee.model';

/**
 * TAWJEEH DOMAIN - Employee Feature - Employee Page View (Routable)
 *
 * Main routable view for employee management.
 * Location: domains/tawjeeh/features/employee/views/
 * Prefix: twj-
 */
@Component({
  selector: 'twj-employee-page-view',
  templateUrl: './employee-page.view.html',
  styleUrls: ['./employee-page.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmployeeListComponent]
})
export class EmployeePageView implements OnInit {
  private facade = inject(EmployeeFacade);
  private router = inject(Router);

  // Expose facade signals
  employees = this.facade.filteredEmployees;
  loading = this.facade.loading;
  error = this.facade.error;
  filteredCount = this.facade.filteredCount;
  totalCount = this.facade.totalCount;

  ngOnInit() {
    this.facade.loadAll();
  }

  onEmployeeSelected(employee: Employee) {
    console.log('Tawjeeh: Employee selected', employee);
    this.facade.selectEmployee(employee);
  }

  onEmployeeAction(employee: Employee) {
    console.log('Tawjeeh: Employee action', employee);
    const displayName = this.facade.getEmployeeDisplayName(employee);
    alert(`Tawjeeh action for: ${displayName}`);
  }

  retryLoad() {
    this.facade.resetAndReload();
  }
}
