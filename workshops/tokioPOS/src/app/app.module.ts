import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StockComponent } from './components/stock/stock.component';
import { StockEditComponent } from './components/stock-edit/stock-edit.component';
import { StockCreateComponent } from './components/stock-create/stock-create.component';
import { ReportComponent } from './components/report/report.component';
import { ShopComponent } from './components/shop/shop.component';
import { PaymentComponent } from './components/payment/payment.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    StockComponent,
    StockEditComponent,
    StockCreateComponent,
    ReportComponent,
    ShopComponent,
    PaymentComponent,
    TransactionComponent,
    TransactionDetailComponent,
    ConfirmDialogComponent,
    SuccessDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
