import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrls: ['./c1.component.scss'],
})
export class C1Component {
  @Input() subtitle: string = '';
  @Output() reset = new EventEmitter();
}
