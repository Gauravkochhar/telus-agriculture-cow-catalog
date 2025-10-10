import { Component, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { Cow, CowService, PrimengModule } from '@digital/core';
import { CowCardComponent } from '../cow-card/cow-card.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CowFormComponent } from '../cow-form/cow-form.component';
import { Router } from '@angular/router';
import { CowFilterComponent } from '../cow-filter/cow-filter.component';

@Component({
  selector: 'app-cow-list',
  imports: [
    CommonModule,
    PrimengModule,
    CowCardComponent,
    CowFormComponent,
    CowFilterComponent,
  ],
  templateUrl: './cow-list.component.html',
  styleUrl: './cow-list.component.scss',
})
export class CowListComponent implements OnInit, OnDestroy {
  displayAddCowForm: boolean = false;
  cowList: Cow[] = [];
  filteredCowList: Cow[] = [];
  subscriptionList: Subscription[] = [];

  private _cowService = inject(CowService);
  private _router = inject(Router);
  private filterRef = viewChild(CowFilterComponent);

  /**
   * Lifecycle hook - Initializes the component and fetches the cow list.
   */
  ngOnInit() {
    this.fetchCowList();
  }

  /**
   * Fetches the list of cows from the service.
   * Applies any previously saved filters if available.
   */
  fetchCowList(): void {
    const sub = this._cowService.getCows().subscribe({
      next: (cows) => {
        this.cowList = cows;
        this.filteredCowList = [...this.cowList];

        const recentAppliedFilter = this._cowService.getRecentAppliedFilter();
        if (recentAppliedFilter) {
          this.filterRef()?.filterForm?.patchValue(recentAppliedFilter || {}, { emitEvent: false });
          this.applyFilters(recentAppliedFilter);
        }
      },
      error: (err) => {
        console.error('Error fetching cows:', err);
      },
    });

    this.subscriptionList.push(sub);
  }

  /**
   * TrackBy function for ngFor for better rendering performance.
   */
  trackByCowId(_index: number, cow: Cow): number {
    return cow?.id;
  }

  /**
   * Opens the Add Cow form dialog.
   */
  openCowForm() {
    this.displayAddCowForm = true;
  }

  /**
   * Handles submission of the cow form.
   * Adds the new cow to the list and reapplies filters.
   */
  onCowFormSubmit(event: Cow) {
    this.displayAddCowForm = false;
    this.cowList = [event, ...this.cowList];
    this.applyFilters(this._cowService.getRecentAppliedFilter());
  }

  /**
   * Navigates to the cow detail view page.
   */
  onViewCowDetails(cow: Cow | undefined): void {
    if (cow?.id) {
      this._router.navigate(['/detail/view', cow.id]);
    }
  }

  /**
   * Applies filters to the cow list based on search and selected statuses.
   */
  applyFilters(filters: any): void {
    this._cowService.setRecentAppliedFilter(filters);
    const search = filters.search?.toLowerCase() || '';
    const statusFilter: string[] = filters?.selectedStatuses || [];

    this.filteredCowList = this.cowList?.filter((cow) => {
      const matchesSearch = [cow?.earTag?.toLowerCase(), cow?.pen?.toLowerCase()].some((e) =>
        e?.includes(search)
      );
      const matchesStatus = statusFilter.length ? statusFilter.includes(cow?.status) : true;
      return matchesSearch && matchesStatus;
    });
  }

  /**
   * Lifecycle hook - Unsubscribes from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptionList?.forEach((sub) => sub?.unsubscribe());
  }
}