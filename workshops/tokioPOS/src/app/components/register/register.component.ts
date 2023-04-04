import { Component } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(public rest: RestService) {}

  hide = true;
  onSubmit(value: any) {
    alert(JSON.stringify(value));
  }

  onClickCancel() {}
}
