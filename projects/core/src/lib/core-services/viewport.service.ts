import { Injectable, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  private viewportSize = signal<number>(this.calculateViewportSize());

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        startWith(null),
        map(() => this.calculateViewportSize())
      )
      .subscribe(size => this.viewportSize.set(size));
  }

  private calculateViewportSize(): number {
    const width = window.innerWidth;
    if (width < 567) return 1;
    if (width >= 567 && width < 767) return 2;
    if (width >= 768 && width < 1024) return 3;
    if (width >= 1024 && width < 1280) return 4;
    return 5;
  }

  public isMobile(): boolean {
    return this.viewportSize() === 1;
  }

  public isTablet(): boolean {
    return this.viewportSize() === 2 || this.viewportSize() === 3;
  }

  public isDesktop(): boolean {
    return this.viewportSize() >= 4;
  }

  public isLargeDesktop(): boolean {
    return this.viewportSize() === 5;
  }

  public get viewportSizeValue(): number {
    return this.viewportSize();
  }
}