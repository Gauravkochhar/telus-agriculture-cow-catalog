import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { ToastPosition, ViewportService } from '@digital/core';
import { PrimeNG } from 'primeng/config';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy{

  public readonly TOAST_POSITION = ToastPosition
  private _viewportService = inject(ViewportService);
  private router = inject(Router);
  public isLoadingRoute = signal<boolean>(false);
  public isTablet = computed<boolean>(() => this._viewportService?.isTablet());
  public isMobile = computed<boolean>(() => this._viewportService?.isMobile());
  private subscriptionList: Subscription[] = [];


  constructor(private primeng: PrimeNG) {
    this.primeng.ripple.set(true);
    this.loadingSubscription();
  }

  loadingSubscription(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoadingRoute.set(true);
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoadingRoute.set(false);
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isLoadingRoute.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionList?.forEach((e) => e?.unsubscribe());
  }
}
