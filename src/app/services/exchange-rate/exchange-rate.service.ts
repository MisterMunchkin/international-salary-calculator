import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversion } from 'src/app/interfaces/conversion';
import { Symbols } from 'src/app/interfaces/symbols';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private basePath = "https://api.exchangerate.host"
  private symbolsRequestUrl = '/symbols';
  private convertRequestUrl = '/convert';

  constructor(private http: HttpClient) { }

  getSupportedSymbols () {
    return this.http.get<Symbols>(this.basePath + this.symbolsRequestUrl);
  }

  convertCurrencies(to: string, from: string, amount: number) {
    var url = this.basePath + this.convertRequestUrl + `?from=${from}&to=${to}&amount=${amount}`;
    return this.http.get<Conversion>(url);
  }
}
