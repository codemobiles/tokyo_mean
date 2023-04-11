import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.scss'],
})
export class StockCreateComponent implements OnInit {
  constructor(private rest: RestService, private location: Location) {}

  imageURL = null;
  imageFile = null;
  formProduct!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit() {
    if (this.formProduct != null && this.imageFile != null) {
      const formData = new FormData();
      formData.append('name', this.formProduct.value.name);
      formData.append('price', this.formProduct.value.price);
      formData.append('stock', this.formProduct.value.stock);
      formData.append('image', this.imageFile);

      await lastValueFrom(this.rest.addProduct(formData));
      this.location.back();
    }
  }

  onChangeImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageURL = event.target.result; // for preview
      };

      reader.readAsDataURL(event.target.files[0]);
      this.imageFile = event.target.files[0]; // for upload
    }
  }

  onClickCancel() {}

  initForm() {
    this.formProduct = new FormGroup({
      name: new FormControl('ProductX', [Validators.required]),
      price: new FormControl(300, [Validators.required, Validators.min(10)]),
      stock: new FormControl(100, [Validators.required, Validators.min(10)]),
    });
  }
}
