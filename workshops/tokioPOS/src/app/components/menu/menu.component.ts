import { RestService } from 'src/app/services/rest.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  constructor(public rest: RestService) {}

  ngOnInit() {}

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
  }
}
