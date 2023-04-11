import { AfterViewInit, Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements AfterViewInit {
  dataSource: Product[] = [];
  displayedColumns: string[] = ['product_id', 'name', 'stock', 'price'];

  constructor(public rest: RestService) {}

  async ngAfterViewInit(): Promise<void> {
    this.dataSource = await lastValueFrom(this.rest.getProducts());
    // alert(JSON.stringify(this.dataArray));
  }
}
