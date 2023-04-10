import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  error = false;
  hide = true;

  constructor(public rest: RestService, private router: Router) {}

  ngOnInit(): void {
    let user: User = {
      username: '',
      password: '',
    };
  }

  public get env(): any {
    return environment;
  }

  ngAfterViewInit(): void {
    // this.onSubmit({ username: 'test1', password: '1234' });
  }

  async onSubmit(value: User) {
    let result = await lastValueFrom(this.rest.login(value));
    alert(JSON.stringify(result));
  }

  onClickRegister() {
    this.router.navigate(['/register']);
  }
}
