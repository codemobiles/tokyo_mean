import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(public rest: RestService) {}

  hide = true;
  async onSubmit(value: any) {
    let result = await lastValueFrom(this.rest.register(value));
    alert(JSON.stringify(result));
  }

  onClickCancel() {}
}
