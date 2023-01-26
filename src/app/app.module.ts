import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

//primeng
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import { ConversionResultComponent } from './conversion-result/conversion-result.component';
import { SalaryConversionFormComponent } from './salary-conversion-form/salary-conversion-form.component';
import {CardModule} from 'primeng/card';

const uiModules = [
  DropdownModule,
  ButtonModule,
  InputNumberModule,
  MessagesModule,
  MessageModule,
  TabViewModule,
  ToastModule,
  CardModule
];

@NgModule({
  declarations: [
    AppComponent,
    ConversionResultComponent,
    SalaryConversionFormComponent
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
