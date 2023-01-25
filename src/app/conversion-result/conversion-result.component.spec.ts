import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionResultComponent } from './conversion-result.component';

describe('ConversionResultComponent', () => {
  let component: ConversionResultComponent;
  let fixture: ComponentFixture<ConversionResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversionResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
