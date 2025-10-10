import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CowFilterComponent } from './cow-filter.component';

describe('CowFilterComponent', () => {
  let component: CowFilterComponent;
  let fixture: ComponentFixture<CowFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CowFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CowFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
