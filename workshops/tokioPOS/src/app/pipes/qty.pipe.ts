import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'qty',
})
export class QtyPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return value + ' qty';
  }
}
