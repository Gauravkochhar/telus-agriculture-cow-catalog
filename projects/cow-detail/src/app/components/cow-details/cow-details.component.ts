import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cow, CowEventType, CowService, CowStatus, PrimengModule } from '@digital/core';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-cow-details',
  imports: [CommonModule, PrimengModule],
  templateUrl: './cow-details.component.html',
  styleUrl: './cow-details.component.scss',
})
export class CowDetailsComponent {
  private _cowId!: string;
  public cow!: Cow;
  showLoading = signal<boolean>(false);
  private _cowService = inject(CowService);
  private _subscriptionList: Subscription[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this._cowId = this.route.snapshot.paramMap.get('id')!;
    this.fetchCowDetails(this._cowId);
  }

  fetchCowDetails(id: string): void {
    this.showLoading.set(true);
    const sub = this._cowService
      .getCowById(+id)
      .pipe(
        finalize(() => {
          this.showLoading.set(false);
        })
      )
      .subscribe({
        next: (cow: Cow | undefined) => {
          this.cow = cow!;
        },
        error: (err) => {
          console.error('Error fetching cow details:', err);
        },
      });
    this._subscriptionList.push(sub);
  }

  get statusClass(): string {
    if (!this.cow) return '';
    switch (this.cow.status) {
      case CowStatus.Active:
        return 'badge-success';
      case CowStatus.InTreatment:
        return 'badge-warning';
      case CowStatus.Deceased:
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }

  getEventIcon(type: CowEventType): string {
  switch (type) {
    case CowEventType.WeightCheck:
      return 'pi pi-calendar';
    case CowEventType.Treatment:
      return 'pi pi-plus';
    case CowEventType.MovedPen:
      return 'pi pi-map-marker';
    case CowEventType.Death:
      return 'pi pi-times-circle';
    default:
      return 'pi pi-info-circle';
  }
}

  ngOnDestroy(): void {
    this._subscriptionList?.forEach((sub) => sub?.unsubscribe());
  }
}
