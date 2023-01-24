import { Component } from '@angular/core';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';
import { Symbols, Symbol } from './interfaces/symbols';
import { SalaryRates } from './static-data/salary-rates';
import { Message } from 'primeng/api/message';

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
  }
}
