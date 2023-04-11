import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements AfterViewInit {
  dataSource: Product[] = [];
  displayedColumns: string[] = [
    'product_id',
    'image',
    'name',
    'stock',
    'price',
  ];

  constructor(public rest: RestService, private router: Router) {}

  async ngAfterViewInit(): Promise<void> {
    this.dataSource = await lastValueFrom(this.rest.getProducts());
    // alert(JSON.stringify(this.dataArray));
  }

  getImageUrl(image: string) {
    return `${
      environment.node_static_url
    }/images/${image}?version=${Math.random()}`;
  }

  handleCreate() {
    this.router.navigate(['stock/create']);
  }
}
