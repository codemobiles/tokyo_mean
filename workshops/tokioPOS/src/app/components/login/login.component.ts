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
    let response = await this.rest.login(value).toPromise();

    if (response.result == 'ok') {
      this.error = null;
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
