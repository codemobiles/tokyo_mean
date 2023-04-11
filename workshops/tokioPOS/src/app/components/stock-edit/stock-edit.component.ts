import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss'],
})
export class StockEditComponent implements OnInit {
  imageURL = null;
  imageFile = null;
  formProduct!: FormGroup;
  originalImage = null;
  constructor(
    public rest: RestService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    const data = await this.rest.getProductById(productId).toPromise();
    this.originalImage = data.image;
    this.initForm(data);
  }

  initForm(data: any) {
    this.formProduct = new FormGroup({
      id: new FormControl(data.product_id, [Validators.required]),
      name: new FormControl(data.name, [Validators.required]),
      price: new FormControl(data.price, [Validators.required]),
      stock: new FormControl(data.stock, [Validators.required]),
      image: new FormControl(null, []),
    });
  }

  async onSubmit() {
    if (this.formProduct != null) {
      let formData = new FormData();

      const { id, name, price, stock } = this.formProduct.value;
      formData.append('id', id);
      formData.append('name', name);
      formData.append('stock', price);
      formData.append('price', stock);

      if (this.imageFile != null) {
        alert('send image');
        formData.append('image', this.imageFile);
      }

      await this.rest.updateProduct(formData).toPromise();
      this.location.back();
    }
  }

  onChangeImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageURL = event.target.result;
        this.originalImage = null;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.imageFile = event.target.files[0];
    }
  }

  onClickCancel() {
    this.location.back();
  }
}
