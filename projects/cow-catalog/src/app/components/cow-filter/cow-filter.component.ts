import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CowStatus, PrimengModule } from '@digital/core';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-cow-filter',
  imports: [CommonModule, PrimengModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cow-filter.component.html',
  styleUrls: ['./cow-filter.component.scss'],
})
export class CowFilterComponent {
  // Available cow statuses for filtering
  statuses: { value: string }[] = [
    { value: CowStatus.Active },
    { value: CowStatus.Deceased },
    { value: CowStatus.InTreatment },
  ];

  // Event emitted whenever the filter form changes
  @Output() filterChanged = new EventEmitter<any>();

  // Reactive form for filter inputs
  filterForm!: FormGroup;

  // Sidebar visibility state
  displaySidebar: boolean = false;

  constructor(private fb: FormBuilder) {
    this.buildForm();
    this.setValueChangeSubscription();
  }

  /**
   * Initialize the reactive form with default filter values
   */
  private buildForm() {
    this.filterForm = this.fb.group({
      search: [''],
      selectedStatuses: [[]],
    });
  }

  /**
   * Subscribe to form value changes with debounce
   * to reduce excessive filter event emissions
   */
  private setValueChangeSubscription() {
    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.onFilterChange());
  }

  /**
   * Emit current filter values to parent component
   */
  onFilterChange(): void {
    this.filterChanged.emit(this.filterForm.value);
  }

  /**
   * Reset filter form to default values
   */
  resetFilters() {
    this.filterForm.reset({
      search: '',
      selectedStatuses: [],
    });
  }

  /**
   * Toggle sidebar visibility
   */
  toggleSidebar() {
    this.displaySidebar = !this.displaySidebar;
  }
}
