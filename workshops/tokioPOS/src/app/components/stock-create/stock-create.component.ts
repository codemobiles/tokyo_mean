import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.scss'],
})
export class StockCreateComponent implements OnInit {
  imageURL = null;
  imageFile = null;
  formProduct!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {}

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
