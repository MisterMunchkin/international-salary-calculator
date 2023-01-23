/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExchangeRateService } from './exchange-rate.service';

describe('Service: ExchangeRate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExchangeRateService]
    });
  });

  it('should ...', inject([ExchangeRateService], (service: ExchangeRateService) => {
    expect(service).toBeTruthy();
  }));
});
