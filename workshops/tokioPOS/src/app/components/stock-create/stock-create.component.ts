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

  onChangeImage(event: any) {}

  onClickCancel() {}

  initForm() {
    this.formProduct = new FormGroup({
      name: new FormControl('ProductX', [Validators.required]),
      price: new FormControl(300, [Validators.required, Validators.min(10)]),
    });
  }
}
