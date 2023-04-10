import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private rest: RestService) {}

  hide = true;
  async onSubmit(value: any) {
    let result = await lastValueFrom(this.rest.login(value));
    alert(JSON.stringify(result));
  }
}
