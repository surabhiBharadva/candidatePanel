import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {
  

  constructor(private datePipe:DatePipe) { }

  getDateWithMonthDayDateYear(date:Date){
    if (isNaN(date.getTime())) {
      return '';
  }
    return this.datePipe.transform(date, 'MMM dd EEEE, yyyy');
  }

  getDateWithMonthDayDate(date:Date){
  //   if (isNaN(date.getTime())) {
  //     return '';
  // }
    return this.datePipe.transform(date, 'MMM dd EEE');
  }

  getDateWithMonthDayYear(date:Date){
    if (isNaN(date.getTime())) {
      return '';
  }
    return this.datePipe.transform(date, 'MMM dd, yyyy');
  }

  getDateWithYearMonthDay(date:Date){
    if (isNaN(date.getTime()) && !(date instanceof Date)) {
      return '';
  }
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  getDateWithYearMonthDayAndTime(date:Date){
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  }

  dBToUI(date:Date){
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSS');
  }
}
