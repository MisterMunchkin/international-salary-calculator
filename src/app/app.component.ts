import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';
import { Symbols, Symbol } from './interfaces/symbols';
import { SalaryRates } from './static-data/salary-rates';
import { catchError, first, map, Observable, of } from 'rxjs';
import { Conversion } from './interfaces/conversion';
import { SalaryRatesResult, ConversionResult } from './interfaces/salary-rates-result';
import {getCurrencySymbol, ViewportScroller} from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  conversionResult?: ConversionResult;

  constructor(
    private scroller: ViewportScroller,
    private changeDetector: ChangeDetectorRef) { }

  newConversionResultEvent(conversionResult: ConversionResult) {
    this.conversionResult = conversionResult;
    this.changeDetector.detectChanges();
    this.scroller.scrollToAnchor("conversion-result");
  }
}
