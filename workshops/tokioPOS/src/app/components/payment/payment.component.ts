import { SuccessDialogComponent } from './../success-dialog/success-dialog.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TransactionRequest } from 'src/app/models/transaction.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input() productOrder: any;
  @Input() totalNumber: any;
  @Output() onCompleted = new EventEmitter<void>();
  givenNumber = '';

  constructor(private rest: RestService, private dialog: MatDialog) {}

  ngOnInit() {}

  onClickGiven(addGiven: number) {
    this.givenNumber = String(Number(this.givenNumber) + addGiven);
  }

  onClickReset() {
    this.givenNumber = '0';
  }

  onClickExact() {
    this.givenNumber = String(this.totalNumber);
  }

  convertToNumber(value: any): number {
    return Number(value.replace(/,/g, ''));
  }

  public get changeMoney(): number {
    let change = this.convertToNumber(this.givenNumber) - this.totalNumber;
    if (change > 0) {
      return change;
    }
    return 0;
  }

  public get isPaidEnough() {
    if (Number(this.givenNumber) >= this.totalNumber) {
      return true;
    }
    return false;
  }

  async onClickSubmit() {
    let trans: TransactionRequest = {
      total: this.totalNumber,
      paid: Number(this.givenNumber),
      change: Number(this.givenNumber) - this.totalNumber,
      order_list: this.productOrder,

      // Use default values
      payment_type: 'cash',
      payment_detail: 'full',
      seller_id: 'sr0001',
      buyer_id: 'by0000',
      subtotal: 0,
      discount: 0,
      shipping_cost: 0,
      comment: '',
      tax_percent: 0,
    };

    try {
      // Send transaction
      await this.rest.sendTransaction(trans).toPromise();
      const dialogConfirm = this.dialog.open(SuccessDialogComponent, {
        data: {
          title: 'การชำระ',
          subtitle: 'สำเร็จ',
        },
      });

      // Show success dialog
      await dialogConfirm.afterClosed().toPromise();
      this.onCompleted.emit();
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }
}
