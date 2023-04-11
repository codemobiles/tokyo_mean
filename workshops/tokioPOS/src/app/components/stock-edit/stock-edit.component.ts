import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss'],
})
export class StockEditComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute) {}
  productId = '';

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
  }

  ngAfterViewInit(): void {}
}
