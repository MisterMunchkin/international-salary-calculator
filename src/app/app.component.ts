import { Component } from '@angular/core';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';
import { Symbols, Symbol } from './interfaces/symbols';
import { SalaryRates } from './static-data/salary-rates';

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
    console.log(this.selectedFromCurrency);
  }
}
