import { Pipe, PipeTransform } from '@angular/core';
import { TiCKET_STATE } from './app-constants';



@Pipe({
  name: 'ticketStateTransform'
})
export class TicketStateTransformPipe implements PipeTransform {
  
  transform(value: string): string {
    var state = '';
    switch (value) {
        case TiCKET_STATE.ASSIGNED:
            state = "ASSIGNED";
            break;
        case TiCKET_STATE.WORKINPROGRESS:
            state= "WORK IN PROGRESS";
            break;
        case TiCKET_STATE.INPROGRESS:
                state= "WORK IN PROGRESS";
                break;
        case TiCKET_STATE.CLOSED:
           state= "CLOSED";
            break;
        case TiCKET_STATE.WAITFORCLOSURE:
            state ='WAIT FOR CLOSURE';
            break;
        case TiCKET_STATE.CANCEL:
            state ='CANCELED';
            break;
        default:
            state ='N/A';
            break;
    }

    return state;
    }
  }


