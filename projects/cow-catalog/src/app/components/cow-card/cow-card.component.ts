import { CommonModule } from '@angular/common';
import { Component, input, Input, output } from '@angular/core';
import { Cow, CowStatus } from '@digital/core';

@Component({
  selector: 'app-cow-card',
  imports: [CommonModule],
  templateUrl: './cow-card.component.html',
  styleUrl: './cow-card.component.scss'
})
export class CowCardComponent {
  public cow = input<Cow | undefined>();
  public viewDetails = output<Cow | undefined>();

  get statusBadgeClass(): string {
    switch (this.cow()?.status) {
      case CowStatus.Active:
        return 'badge badge-success';
      case CowStatus.InTreatment:
        return 'badge badge-warning';
      case CowStatus.Deceased:
        return 'badge badge-danger';
      default:
        return 'badge badge-secondary';
    }
  }

  onCardClick(): void {
    this.viewDetails.emit(this.cow());
  }
}
