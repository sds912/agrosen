import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    
    // Convert the date string to a Date object
    const date = new Date(value);

    // Extract the date and time components
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    // Format the date and time
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    return formattedDate;
  }

}
