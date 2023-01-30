import { ChangeDetectorRef, Component } from '@angular/core';
import { ConversionResult } from './interfaces/salary-rates-result';
import { ViewportScroller} from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  conversionResult?: ConversionResult;

  constructor(
    private scroller: ViewportScroller,
    private changeDetector: ChangeDetectorRef) { }

  newConversionResultEvent(conversionResult: ConversionResult) {
    this.conversionResult = conversionResult;
    this.changeDetector.detectChanges();
    this.scroller.scrollToAnchor("conversion-result");
  }
}
