import { AfterViewInit, Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  error = false;
  hide = true;

  constructor(public rest: RestService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.onSubmit({ username: 'test1', password: '1234' });
  }

  async onSubmit(value: any) {
    let result = await lastValueFrom(this.rest.login(value));
    alert(JSON.stringify(result));
  }

  onClickRegister() {}
}
