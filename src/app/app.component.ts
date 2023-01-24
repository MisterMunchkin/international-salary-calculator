import { Component } from '@angular/core';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';
import { Symbols, Symbol } from './interfaces/symbols';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'international-salary-calculator-angular';
  symbols: Array<Symbol> = [];
  selectedSymbol: Symbol = {
    description: '',
    code: ''
  };
  selectedAmount: number = 0;

  constructor(private exchangeRate: ExchangeRateService) {

    exchangeRate.getSupportedSymbols()
    .subscribe((data: Symbols) => {
      this.symbols = Object.values(data.symbols);
      console.log(this.symbols);
    });
  }

  convert() {
    console.log(this.selectedSymbol);
  }
}
