import { getCurrencySymbol } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ConversionResult } from '../interfaces/salary-rates-result';

@Component({
  selector: 'app-conversion-result',
  templateUrl: './conversion-result.component.html',
  styleUrls: ['./conversion-result.component.scss']
})
export class ConversionResultComponent {
  @Input() conversionResult?: ConversionResult;

  currencySymbol(code: string) {
    return (code) ? getCurrencySymbol(code, "wide") : '';
  }
}
