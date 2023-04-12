import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'transaction_id',
    'timestamp',
    'staff_id',
    'total',
    'paid',
    'discount',
    'order_list',
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild('detail', { static: false })
  detailComponent!: TransactionDetailComponent;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  startDate = moment().startOf('month').format('YYYY-MM-DD');
  endDate = moment().endOf('month').format('YYYY-MM-DD');
  selectedId!: string;

  constructor(private rest: RestService) {}

  async ngOnInit() {
    this.dataSource.data = await lastValueFrom(this.rest.getTransaction()); // lastValueFrom
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async feed() {
    this.selectedId = '';
    this.dataSource.data = await lastValueFrom(
      this.rest.getTransactionByDate(this.startDate, this.endDate)
    ); // lastValueFrom
  }

  onChangeBegin({ value }: any) {
    this.startDate = moment(value).format('YYYY-MM-DD');
    this.feed();
  }

  onChangeEnd({ value }: any) {
    this.endDate = moment(value).format('YYYY-MM-DD');
    this.feed();
  }

  getNumberOfSKU(rawOrder: any): number {
    let order = JSON.parse(rawOrder);
    return order.length;
  }

  onClickRow(id: string) {
    this.selectedId = id;
    // setTimeout(() => {
    //   this.detailComponent.load(this.selectedId);
    // }, 100);
  }
}
