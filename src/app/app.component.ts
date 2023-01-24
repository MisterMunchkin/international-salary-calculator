import { Component } from '@angular/core';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';
import { Symbols, Symbol } from './interfaces/symbols';
import { SalaryRates } from './static-data/salary-rates';
import { Message } from 'primeng/api/message';
import { first } from 'rxjs';
import { Conversion } from './interfaces/conversion';
import { SalaryRatesResult } from './interfaces/salary-rates-result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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

  constructor(private exchangeRate: ExchangeRateService) {
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
    //check if amount is greater than 0
    this.invalidAmount = (this.selectedAmount <= 0);

    if (!this.invalidAmount) {
      let fromCurrCode = this.selectedFromCurrency.code;
      let toCurrCode = this.selectedToCurrency.code;

      this.exchangeRate.convertCurrencies(toCurrCode, fromCurrCode, this.selectedAmount)
      .pipe(
        first()
      )
      .subscribe((result: Conversion) => {
        this.salaryResult(result);
      });
    }
  }

  salaryResult (conversion: Conversion) {
    //Convert result amount to hourly based on selectedSalaryRate
    let hourlyAmount = this.convertToHourly(this.selectedSalaryRate, conversion.result);
    let allSalaryRates = this.getAllSalaryRatesFromHourly(hourlyAmount);

    console.log(hourlyAmount);
    console.log(allSalaryRates);
    console.log(conversion);
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
