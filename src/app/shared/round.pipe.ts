import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {
    transform(value: number): number {
        if (typeof value !== 'number') {
          return value;
        }
        return +value.toFixed(1); // Round to 2 decimal places and convert to number
      }
}
