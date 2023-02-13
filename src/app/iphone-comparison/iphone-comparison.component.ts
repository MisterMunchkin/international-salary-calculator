import { Component, Input } from '@angular/core';
import { iPhonePricesAvgRentData } from '../static-data/iphone-prices-avg-rent-data';
import { iPhonePricesAvgRent } from '../interfaces/iphone-prices-avg-rent';
import { getCurrencySymbol } from '@angular/common';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-iphone-comparison',
  templateUrl: './iphone-comparison.component.html',
  styleUrls: ['./iphone-comparison.component.scss']
})
//This should just be an independent component where the user can select countries from our data set to compare.
export class IphoneComparisonComponent {
  private _toCurrencyName?: string;

  @Input()
  set toCurrencyName(value: string) {
    this._toCurrencyName = value;

    const countryName = this.searchCountryByFuse(value);
    this.setToComparison(countryName);

    console.log(value);
    console.log(this.toCountryComparison);
  }
  get toCurrencyName() : string {
    return this._toCurrencyName ?? '';
  }

  private _fromCurrencyName?: string;

  @Input()
  set fromCurrencyName(value: string) {
    this._fromCurrencyName = value;

    const countryName = this.searchCountryByFuse(value);
    this.setFromComparison(countryName);

    console.log(value);
    console.log(this.fromCountryComparison);
  }
  get fromCurrencyName() : string {
    return this._fromCurrencyName ?? '';
  }

  iPhonePricesAvgRent: Array<iPhonePricesAvgRent> = [];

  toCountryComparison: iPhonePricesAvgRent = {
    country: ''
  };

  fromCountryComparison: iPhonePricesAvgRent = {
    country: ''
  };

  countries: Array<string>;

  iPhonePriceByCountryHash: {
    [k: string]: number | undefined;
  };

  aNoDataForComparison: boolean = false;
  bNoDataForComparison: boolean = false;

  fuse: Fuse<string>;

  constructor() {
    this.iPhonePricesAvgRent = JSON.parse(JSON.stringify(iPhonePricesAvgRentData.iphonePricesAvgRent));

    this.countries = this.iPhonePricesAvgRent.map(e => e.country);
    this.countries.push('Not Applicable'); //for when no prices available for specific country

    this.iPhonePriceByCountryHash = Object.fromEntries(
      this.iPhonePricesAvgRent.map(e => [e.country, e.iphonePrice])
    );

    this.fuse = new Fuse(this.countries);
  }

  searchCountryByFuse(currencyName: string) : string {
    if (!currencyName) {
      return 'Not Applicable';
    }

    const fuseResults = this.fuse.search(currencyName);
    const countryResult = fuseResults[0]?.item ?? 'Not Applicable';

    return countryResult;
  }

  setToComparison(countryName: string) {
    this.toCountryComparison = {
      country: countryName,
      iphonePrice: this.iPhonePriceByCountryHash[countryName] ?? undefined
    };
  }

  setFromComparison(countryName: string) {
    this.fromCountryComparison = {
      country: countryName,
      iphonePrice: this.iPhonePriceByCountryHash[countryName] ?? undefined
    };
  }

  changeSelection() {
    this.toCountryComparison.iphonePrice = this.iPhonePriceByCountryHash[this.toCountryComparison.country];
    this.fromCountryComparison.iphonePrice = this.iPhonePriceByCountryHash[this.fromCountryComparison.country];
  }

  usdCurrencySymbol() {
    return getCurrencySymbol('USD', 'wide');
  }
}
