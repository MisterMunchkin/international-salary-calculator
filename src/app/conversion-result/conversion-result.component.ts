import { getCurrencySymbol } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ConversionResult } from '../interfaces/salary-rates-result';
import { SalaryRatesData } from '../static-data/salary-rates-data';

@Component({
  selector: 'app-conversion-result',
  templateUrl: './conversion-result.component.html',
  styleUrls: ['./conversion-result.component.scss']
})
export class ConversionResultComponent {
  @Input() conversionResult?: ConversionResult;

  private _selectedSalaryRate?: string;
  @Input()
  set selectedSalaryRate(value: string) {
    this._selectedSalaryRate = value.toLowerCase();
  }
  get selectedSalaryRate() : string {
    return this._selectedSalaryRate ?? 'yearly';
  }

  currencySymbol(code: string | undefined) {
    return (code) ? getCurrencySymbol(code, "wide") : '';
  }

  getSalaryRateFromKey(salaryRateKey: string) : number {
    return (this.conversionResult) ? this.conversionResult.salaryRates[salaryRateKey as keyof SalaryRatesData] : 0;
  }
}
