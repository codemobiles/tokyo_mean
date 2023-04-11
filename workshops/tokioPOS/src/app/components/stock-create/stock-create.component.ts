import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.scss'],
})
export class StockCreateComponent {
  imageURL = null;
  imageFile = null;
  formProduct!: FormGroup;

  onSubmit() {}

  onChangeImage(event: any) {}

  onClickCancel() {}
}
