import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Lek lek';
  // Implication Declaration
  tmp1 = 10;
  tmp2 = 'Hey';
  tmp3 = true;
  // Explication Declaration
  tmp4: number = 20;
  tmp5: string = 'Yes';
  tmp6: boolean = false;
  counter1 = 0;

  addCounter1() {
    this.counter1++;
  }

  method1() {
    alert('Method1');
  }

  method2(msg: string) {
    alert(msg);
  }
}
