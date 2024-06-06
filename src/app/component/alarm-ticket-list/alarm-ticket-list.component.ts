import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alarm-ticket-list',
  templateUrl: './alarm-ticket-list.component.html',
  styleUrl: './alarm-ticket-list.component.css'
})
export class AlarmTicketListComponent implements OnInit {
  index1 = 0;
  index2 = 0;

  tickets: any[] = [];
  
  constructor(private http: HttpClient, private router: Router){

  }

  ngOnInit(): void {
    this.fetchTicket();
  }


  fetchTicket(): void {
    this.http.get<any>('http://62.171.177.19:3001/api/tickets/current-user')
      .subscribe(
        (response: any) => {
          this.tickets = response.data;
          console.log(response.data)
          },
        error => console.error('There was an error fetching the site options!', error)
      );
  }

  navigateToNewTicket(){
    this.router.navigate(['admin/alarms/tickets'], { queryParams: { state: 'open' } });
  }

  navigateToTicketDetails(id: string){
    this.router.navigate(['admin/alarms/tickets'], { queryParams: { id: 'id' } });
  }

  

}
