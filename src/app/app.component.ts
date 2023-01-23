import { Component } from '@angular/core';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';
import { Symbols } from './interfaces/symbols';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'international-salary-calculator-angular';

  constructor(private exchangeRate: ExchangeRateService) {

    exchangeRate.getSupportedSymbols()
    .subscribe((data: Symbols) => {
      console.log(data);
    })
  }
}
