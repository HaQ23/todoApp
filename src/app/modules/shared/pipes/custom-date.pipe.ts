import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date | null): string {
    if (value === null) {
      return 'Wybierz datę';
    }

    const date = new Date(value);
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    } as const;
    return date.toLocaleDateString('pl-PL', options);
  }
}
