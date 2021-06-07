import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCusTranComponent } from './admin-cus-tran.component';

describe('AdminCusTranComponent', () => {
  let component: AdminCusTranComponent;
  let fixture: ComponentFixture<AdminCusTranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCusTranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCusTranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
