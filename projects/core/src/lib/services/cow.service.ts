import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cow, CowStatus } from '../models';
import { COW_LIST } from '../mock/cow-list.mock';

@Injectable({
  providedIn: 'root'
})
export class CowService {

  private cows: Cow[] = COW_LIST;
  private recentAppliedFilter: any;

  constructor() { }

  getCows(): Observable<Cow[]> {
    return of(this.cows);
  }

  getCowById(id: number): Observable<Cow | undefined> {
    return of(this.cows.find(cow => cow.id === id));
  }

  setRecentAppliedFilter(filters: any): void {
    this.recentAppliedFilter = filters;
  }

  getRecentAppliedFilter(): any {
    return this.recentAppliedFilter;
  }
}
