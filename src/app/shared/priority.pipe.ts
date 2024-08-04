import { Pipe, PipeTransform } from '@angular/core';
import { PRIORITIES } from './app-constants';

@Pipe({
  name: 'priorityPipe'
})
export class PriorityPipe implements PipeTransform {

  transform(value: string): any{
    if(value === "1"){
    return  PRIORITIES.CRITICAL;
    }
    if(value === "2"){
    return  PRIORITIES.HIGH;
      
    }
    if(value === "3"){
    return  PRIORITIES.MODERATE;
      
    }

    if(value === "4"){
    return  PRIORITIES.LOW;
      
    }

    return '';
  }

}



@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(value: any,searchfilter:any): any {
    return value.filter((e:any)=>{
      return e.siteName.indexOf(searchfilter) > -1;
    })
  }

}
