import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryConversionFormComponent } from './salary-conversion-form.component';

describe('SalaryConversionFormComponent', () => {
  let component: SalaryConversionFormComponent;
  let fixture: ComponentFixture<SalaryConversionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryConversionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryConversionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
