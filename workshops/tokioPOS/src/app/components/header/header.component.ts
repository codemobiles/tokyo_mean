import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  pageName: string = '';
  version = environment.version;

  constructor(private router: Router, public rest: RestService) {}

  ngOnInit() {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onClickSignout() {
    localStorage.removeItem(environment.token);
    this.router.navigate(['login']);
  }
}
