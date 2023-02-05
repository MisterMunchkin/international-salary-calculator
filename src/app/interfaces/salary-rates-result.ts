import {Symbol} from './symbols';

export interface ConversionResult {
  salaryRates: SalaryRatesResult,
  toCurrency: Symbol,
  fromCurrency: Symbol
};

export interface SalaryRatesResult {
  hourly: number,
  daily: number,
  weekly: number,
  monthly: number,
  yearly: number,
}
