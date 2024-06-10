import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { TicketService } from '../../service/ticket.service';

@Component({
  selector: 'app-alarm-ticket-list',
  templateUrl: './alarm-ticket-list.component.html',
  styleUrl: './alarm-ticket-list.component.css'
})
export class AlarmTicketListComponent implements OnInit {
  index1 = 0;
  index2 = 0;
  loading: boolean = true;
  total: number = 0;
  pageSize = 10;
  pageIndex = 1;
  

  priorities: any[] = [{
    key: '1',
    label: 'CRITICAL'
  },
  {
    key: '2',
    label: 'HIGH'
  },
  {
    key: '3',
    label: 'MODERATE'
  },
  {
    key: '4',
    label: 'LOW'
  },
  ]

  tickets: any[] = [];

  constructor(private http: HttpClient, private router: Router, private ticketService: TicketService) {

  }

  ngOnInit(): void {
    this.fetchTicket();
  }


  getPriority(value: string): string {
    return this.priorities.find(v => v.key === value).label;
  }

  fetchTicket(page: number=1, limit:number=10): void {
    this.loading = true;
    this.ticketService.fetchTickets(page,limit)
      .subscribe(
        (response: any) => {
          this.tickets = response.data;
          this.total = response.count;
          this.loading = false;
        },
        error =>{ 
          console.error('There was an error fetching the site options!', error);
          this.loading = false;
        }
      );
  }

  navigateToNewTicket() {
    this.router.navigate(['admin/alarms/tickets'], { queryParams: { state: 'open' } });
  }

  navigateToTicketDetails(id: string) {
    this.router.navigate(['admin/alarms/tickets'], { queryParams: { id: 'id' } });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.fetchTicket(pageIndex,pageSize);
   // this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }



}
