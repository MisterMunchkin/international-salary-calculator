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
  title = 'international-salary-calculator-angular';

  hoursPerWeek: number = 40;
  daysPerWeek: number = 5;

  salaryRates: Array<string> = [];
  symbols: Array<Symbol> = [];

  selectedSalaryRate: string = 'Yearly';
  selectedFromCurrency: Symbol = {
    description: 'United States Dollar',
    code: 'USD'
  };

  selectedToCurrency: Symbol = {
    description: 'Euro',
    code: 'EUR'
  }

  selectedAmount: number = 0;
  invalidAmount: boolean = false;

  userLanguage = navigator.language;

  conversionResult: ConversionResult = {
    salaryRates: {
      hourly: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
      yearly: 0
    },
    selectedCurrency: {
      description: '',
      code: ''
    }
  };
  loadingConversion: boolean = false;

  constructor(
    private exchangeRate: ExchangeRateService,
    private messageService: MessageService,
    private scroller: ViewportScroller,
    private changeDetector: ChangeDetectorRef) {
    this.salaryRates = SalaryRates.salaryRates;

    exchangeRate.getSupportedSymbols()
    .pipe(
      first()
    )
    .subscribe((data: Symbols) => {
      this.symbols = Object.values(data.symbols);

      this.symbols.sort((a, b) => (a.description < b.description) ? -1 : 1);
    });
  }

  convert() {
    if (this.selectedAmount <= 0) {
      this.invalidAmount = true;
      return;
    }

    this.invalidAmount = false;
    this.loadingConversion = true;

    let fromCurrCode = this.selectedFromCurrency.code;
    let toCurrCode = this.selectedToCurrency.code;

    this.exchangeRate.convertCurrencies(toCurrCode, fromCurrCode, this.selectedAmount)
    .pipe(
      catchError(err => {
        throw err;
      }),
      first()
    )
    .subscribe({
      next: result => {
        this.salaryResult(result);
        this.changeDetector.detectChanges();
        this.scroller.scrollToAnchor("conversion-result");
        this.loadingConversion = false;
      },
      error: err => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Oh noes...',
          detail: 'Something went wrong retrieving the conversion. Don\'t blame yourself you tried your best. Try again in a few seconds.',
          life: 10000
        });
        this.loadingConversion = false;
      }
    });
    // .subscribe((result: Conversion) => {
    //   this.salaryResult(result);
    //   this.loadingConversion = false;
    // });
  }

  salaryResult (conversion: Conversion) {
    //Convert result amount to hourly based on selectedSalaryRate
    let hourlyAmount = this.convertToHourly(this.selectedSalaryRate, conversion.result);
    let allSalaryRates = this.getAllSalaryRatesFromHourly(hourlyAmount);

    this.conversionResult = {
      selectedCurrency: JSON.parse(JSON.stringify(this.selectedToCurrency)),
      salaryRates: allSalaryRates
    }
  }

  convertToHourly(salaryRate: string, amount: number) : number {
    if (salaryRate === "Hourly") {
      return amount;
    }

    if (salaryRate === "Daily") {
      return amount / 8;
    }

    if (salaryRate === "Weekly") {
      return amount / this.hoursPerWeek; //subject to change when amount of hours per week is implemented
    }

    if (salaryRate === "Monthly") {
      return ((amount * 12) / 52) / this.hoursPerWeek; //subject to change when amount of hours per week is implemented
    }

    //Yearly
    return (amount / 52) / this.hoursPerWeek;  //subject to change when amount of hours per week is implemented
  }

  getAllSalaryRatesFromHourly(hourly: number) : SalaryRatesResult {
    var result = {
      hourly: hourly,
      daily: hourly * (this.hoursPerWeek / this.daysPerWeek), //assuming 40 hour work week and 5 days a week
      weekly: hourly * this.hoursPerWeek, //assuming 40 hour work week
      monthly: (hourly * this.hoursPerWeek * 52) / 12,
      yearly: hourly * this.hoursPerWeek * 52
    } as SalaryRatesResult;

    result.hourly = Math.round((result.hourly + Number.EPSILON) * 100) / 100;
    result.daily = Math.round((result.daily + Number.EPSILON) * 100) / 100;
    result.weekly = Math.round((result.weekly + Number.EPSILON) * 100) / 100;
    result.monthly = Math.round((result.monthly + Number.EPSILON) * 100) / 100;
    result.yearly = Math.round((result.yearly + Number.EPSILON) * 100) / 100;

    return result;
  }

  currencySymbol(code: string) {
    return (code) ? getCurrencySymbol(code, "wide") : '';
  }
}
