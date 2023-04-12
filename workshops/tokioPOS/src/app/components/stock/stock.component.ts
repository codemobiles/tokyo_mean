import { RestService } from './../../services/rest.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'product_id',
    'image',
    'name',
    'price',
    'stock',
    'action',
  ];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  searchValue = '';
  searchTerm = new Subject<string>(); // subject is list of observable - receive new req by calling next function

  constructor(public rest: RestService, private dialog: MatDialog) {}

  async ngOnInit() {
    this.dataSource.data = await lastValueFrom(await this.rest.getProducts());

    this.rest.searchProduct(this.searchTerm);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public get numberOfRow(): string {
    if (this.dataSource.data) {
      return this.dataSource.data.length.toString();
    }
    return '0';
  }

  async onClickDelete(row: any) {
    const dialogConfirm = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'ลบสินค้า',
        subtitle: 'คุณต้องการลบสินค้านี้ใช่หรือไม่?',
        item: row,
      },
    });

    let result = await lastValueFrom(dialogConfirm.afterClosed());
    if (result) {
      await lastValueFrom(this.rest.deleteProduct(row.product_id));
      this.dataSource.data = await lastValueFrom(this.rest.getProducts());
    }
  }

  async doFilter(event: any) {
    console.log(event.target.value);
    const filterValue = event.target.value;

    // do local
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // do remote
    this.searchTerm.next(event.target.value);
  }

  clearSearch() {
    this.searchValue = '';
    this.searchTerm.next('');
  }
}
