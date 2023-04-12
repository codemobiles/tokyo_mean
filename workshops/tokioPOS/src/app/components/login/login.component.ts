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
  error?: string | null;
  hide = true;

  constructor(public rest: RestService, private router: Router) {}

  ngOnInit(): void {}

  public get env(): any {
    return environment;
  }

  ngAfterViewInit(): void {
    // this.onSubmit({ username: 'test1', password: '1234' });
  }

  async onSubmit(value: User) {
    let response = await lastValueFrom(this.rest.login(value));

    if (response.result == 'ok') {
      this.error = null;
      this.rest.currentUser = value.username;
      localStorage.setItem(environment.token, response.token);
      this.router.navigate(['stock']);
    } else {
      this.error = response.message;
      localStorage.removeItem(environment.token);
    }
  }

  onClickRegister() {
    this.router.navigate(['/register']);
  }
}
