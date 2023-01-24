import { Component } from '@angular/core';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';
import { Symbols, Symbol } from './interfaces/symbols';
import { SalaryRates } from './static-data/salary-rates';
import { Message } from 'primeng/api/message';
import { first } from 'rxjs';
import { Conversion } from './interfaces/conversion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'international-salary-calculator-angular';

  salaryRates: Array<string> = [];
  selectedSalaryRate: string = 'Yearly';

  symbols: Array<Symbol> = [];
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
      console.log(this.symbols);
    });
  }

  convert() {
    //check if amount is greater than 0
    this.invalidAmount = (this.selectedAmount <= 0);

    console.log(this.selectedFromCurrency);
    console.log(this.selectedAmount);
    console.log(this.selectedSalaryRate);
    console.log(this.selectedToCurrency);

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
      return amount / 40; //subject to change when amount of hours per week is implemented
    }

    if (salaryRate === "Monthly") {
      return ((amount * 12) / 52) / 40; //subject to change when amount of hours per week is implemented
    }

    //Yearly
    return (amount / 52) / 40;  //subject to change when amount of hours per week is implemented
  }

  getAllSalaryRatesFromHourly(hourly: number) {
    var result = {
      hourly: hourly,
      daily: hourly * (40 / 5), //assuming 40 hour work week and 5 days a week
      weekly: hourly * 40, //assuming 40 hour work week
      monthly: (hourly * 40 * 52) / 12,
      yearly: hourly * 40 * 52
    };

    result.hourly = Math.round((result.hourly + Number.EPSILON) * 100) / 100;
    result.daily = Math.round((result.daily + Number.EPSILON) * 100) / 100;
    result.weekly = Math.round((result.weekly + Number.EPSILON) * 100) / 100;
    result.monthly = Math.round((result.monthly + Number.EPSILON) * 100) / 100;
    result.yearly = Math.round((result.yearly + Number.EPSILON) * 100) / 100;

    return result;
  }
}
