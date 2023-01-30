import { Component, Input, OnInit } from '@angular/core';
import { iPhonePricesAvgRentData } from '../static-data/iphone-prices-avg-rent-data';
import { iPhonePricesAvgRent } from '../interfaces/iphone-prices-avg-rent';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-iphone-comparison',
  templateUrl: './iphone-comparison.component.html',
  styleUrls: ['./iphone-comparison.component.css']
})
//This should just be an independent component where the user can select countries from our data set to compare.
export class IphoneComparisonComponent implements OnInit {
  aCountryComparison: iPhonePricesAvgRent = {
    country: 'United States of America'
  };

  bCountryComparison: iPhonePricesAvgRent = {
    country: 'Philippines'
  };

  countries: Array<string>;

  iPhonePriceByCountryHash: {
    [k: string]: number | undefined;
  };

  aNoDataForComparison: boolean = false;
  bNoDataForComparison: boolean = false;

  constructor() {
    var iPhonePricesAvgRent: Array<iPhonePricesAvgRent> = JSON.parse(JSON.stringify(iPhonePricesAvgRentData.iphonePricesAvgRent));

    this.countries = iPhonePricesAvgRent.map(e => e.country);

    this.iPhonePriceByCountryHash = Object.fromEntries(
      iPhonePricesAvgRent.map(e => [e.country, e.iphonePrice])
    );

    this.changeSelection();
  }

  ngOnInit() {

  }

  changeSelection() {
    this.aCountryComparison.iphonePrice = this.iPhonePriceByCountryHash[this.aCountryComparison.country];
    this.bCountryComparison.iphonePrice = this.iPhonePriceByCountryHash[this.bCountryComparison.country];
  }

  usdCurrencySymbol() {
    return getCurrencySymbol('USD', 'wide');
  }
}
