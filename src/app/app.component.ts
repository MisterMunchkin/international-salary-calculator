import { ChangeDetectorRef, Component } from '@angular/core';
import { ConversionResult } from './interfaces/salary-rates-result';
import { ViewportScroller} from '@angular/common';
import { MessageService } from 'primeng/api';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  conversionResult?: ConversionResult;
  selectedSalaryRate: string = 'Yearly';

  constructor(
    private scroller: ViewportScroller,
    private changeDetector: ChangeDetectorRef,
    private meta: Meta) {

    this.meta.addTags([
      {name: 'description', content: 'A powerful salary and currency converter'},
      {name: 'author', content: 'Robin Dalmy'},
      {name: 'keywords', content: 'Salary, Currency, Converter, Rate, Job, Opportunity, Offer, Remote'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }

  newConversionResultEvent(conversionResult: ConversionResult) {
    this.conversionResult = conversionResult;
    this.changeDetector.detectChanges();
    this.scroller.scrollToAnchor("conversion-result");
  }

  newSelectedSalaryRateEvent(selectedSalaryRate: string) {
    this.selectedSalaryRate = selectedSalaryRate;
  }
}
