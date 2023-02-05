import { Component, Input, OnInit } from '@angular/core';
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
export class IphoneComparisonComponent implements OnInit {
  @Input() toCountryName?: string;
  @Input() fromCountryName?: string;

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

    this.iPhonePriceByCountryHash = Object.fromEntries(
      this.iPhonePricesAvgRent.map(e => [e.country, e.iphonePrice])
    );

    this.fuse = new Fuse(this.countries);
  }

  ngOnInit() {
    //fuzzy search for country name in data set based on currency description
    if (this.toCountryName) {
      const toFuseResults = this.fuse.search(this.toCountryName);
      const toCountryResult = toFuseResults[0]?.item ?? '';
      this.toCountryComparison.country =  toCountryResult;
      this.toCountryComparison.iphonePrice = this.iPhonePriceByCountryHash[toCountryResult];
    }

    if (this.fromCountryName) {
      const fromFuseResults = this.fuse.search(this.fromCountryName);
      const fromCountryResult = fromFuseResults[0]?.item ?? '';
      this.fromCountryComparison.country = fromCountryResult;
      this.fromCountryComparison.iphonePrice = this.iPhonePriceByCountryHash[fromCountryResult];
    }
  }

  changeSelection() {
    this.toCountryComparison.iphonePrice = this.iPhonePriceByCountryHash[this.toCountryComparison.country];
    this.fromCountryComparison.iphonePrice = this.iPhonePriceByCountryHash[this.fromCountryComparison.country];
  }

  usdCurrencySymbol() {
    return getCurrencySymbol('USD', 'wide');
  }
}
