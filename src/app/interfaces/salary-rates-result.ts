import {Symbol} from './symbols';

export interface ConversionResult {
  salaryRates: SalaryRatesResult,
  selectedCurrency: Symbol
};

export interface SalaryRatesResult {
  hourly: number,
  daily: number,
  weekly: number,
  monthly: number,
  yearly: number,
}
