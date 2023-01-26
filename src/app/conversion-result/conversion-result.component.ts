import { getCurrencySymbol } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { ConversionResult } from '../interfaces/salary-rates-result';
import { SalaryRates } from '../static-data/salary-rates';

@Component({
  selector: 'app-conversion-result',
  templateUrl: './conversion-result.component.html',
  styleUrls: ['./conversion-result.component.scss']
})
export class ConversionResultComponent {
  @Input() conversionResult?: ConversionResult;

  selectedSalaryRate: string = 'yearly';

  currencySymbol(code: string) {
    return (code) ? getCurrencySymbol(code, "wide") : '';
  }

  getSalaryRateFromKey(salaryRateKey: string) : number {
    return (this.conversionResult) ? this.conversionResult.salaryRates[salaryRateKey as keyof SalaryRates] : 0;
  }
}
