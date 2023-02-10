import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, first } from 'rxjs';
import { Conversion } from '../interfaces/conversion';
import { ConversionResult, SalaryRatesResult } from '../interfaces/salary-rates-result';
import { Symbols, Symbol } from '../interfaces/symbols';
import { ExchangeRateService } from '../services/exchange-rate/exchange-rate.service';
import { SalaryRatesData } from '../static-data/salary-rates-data';

@Component({
  selector: 'app-salary-conversion-form',
  templateUrl: './salary-conversion-form.component.html',
  styleUrls: ['./salary-conversion-form.component.scss']
})
export class SalaryConversionFormComponent {
  hoursPerWeek: number = 40;
  daysPerWeek: number = 5;

  symbols: Array<Symbol> = [];
  salaryRates: Array<string> = [];

  selectedSalaryRate: string = 'Yearly';
  selectedFromCurrency: Symbol = {
    description: 'United States Dollar',
    code: 'USD'
  };

  selectedToCurrency: Symbol = {
    description: 'Euro',
    code: 'EUR'
  }

  loadingSymbols: boolean = false;

  selectedAmount: number | null = null;
  invalidAmount: boolean = false;

  userLanguage = navigator.language;

  @Output() newConversionResultEvent = new EventEmitter<ConversionResult>();
  conversionResult?: ConversionResult;
  loadingConversion: boolean = false;
  constructor(
    private exchangeRateService: ExchangeRateService,
    private messageService: MessageService,
  ) {
    this.salaryRates = SalaryRatesData.salaryRates;
    this.loadingSymbols = true;

    this.exchangeRateService.getSupportedSymbols()
    .pipe(
      first()
    )
    .subscribe((data: Symbols) => {
      this.symbols = Object.values(data.symbols);

      this.symbols.sort((a, b) => (a.description < b.description) ? -1 : 1);
      this.loadingSymbols = false;
    });
  }

  convert() {
    if (this.selectedAmount == null || this.selectedAmount <= 0) {
      this.invalidAmount = true;
      return;
    }

    this.invalidAmount = false;
    this.loadingConversion = true;

    let fromCurrCode = this.selectedFromCurrency.code;
    let toCurrCode = this.selectedToCurrency.code;

    this.exchangeRateService.convertCurrencies(toCurrCode, fromCurrCode, this.selectedAmount)
    .pipe(
      catchError(err => {
        throw err;
      }),
      first()
    )
    .subscribe({
      next: result => {
        this.salaryResult(result);

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
  }

  salaryResult (conversion: Conversion) {
    //Convert result amount to hourly based on selectedSalaryRate
    let hourlyAmount = this.convertToHourly(this.selectedSalaryRate, conversion.result);
    let allSalaryRates = this.getAllSalaryRatesFromHourly(hourlyAmount);

    this.conversionResult = {
      toCurrency: JSON.parse(JSON.stringify(this.selectedToCurrency)),
      fromCurrency: JSON.parse(JSON.stringify(this.selectedFromCurrency)),
      salaryRates: allSalaryRates
    }

    this.newConversionResultEvent.emit(this.conversionResult);
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
}
