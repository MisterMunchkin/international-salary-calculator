import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConversionResultComponent } from './conversion-result/conversion-result.component';
import { IphoneComparisonComponent } from './iphone-comparison/iphone-comparison.component';
import { SalaryConversionFormComponent } from './salary-conversion-form/salary-conversion-form.component';
import { FooterComponent } from './footer/footer.component';

import { FormsModule } from '@angular/forms';

//primeng
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';

const uiModules = [
  DropdownModule,
  ButtonModule,
  InputNumberModule,
  MessageModule,
  ToastModule,
  CardModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ConversionResultComponent,
    SalaryConversionFormComponent,
    IphoneComparisonComponent,
    FooterComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    uiModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
