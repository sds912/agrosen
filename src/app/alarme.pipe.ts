import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alarmepipe'
})
export class AlarmePipe implements PipeTransform {

  transform(value: any,searchfilter:any): any {
    return value.filter((e:any)=>{
      return e.sites.siteId.indexOf(searchfilter) > -1;
    })
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
