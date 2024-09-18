import { ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MapInfoWindow,MapMarker,} from '@angular/google-maps';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AlarmesService } from '../../service/alarmes.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  
  @ViewChild(MapInfoWindow, { static: false })
  //infoWindow!: MapInfoWindow;
  center: google.maps.LatLngLiteral = { lat: 14.7645042, lng: -17.3660286 };
  zoom = 8;
  markers: any[] = [];
  /*00 markers = [
    { id: 1,  lat: "14.7645042", lng: "-17.3660286" , label: 'A' },
    { id: 2,  lat: "14.791005", lng: "-16.935860 ", label: 'B' },
    { id: 3,  lat: "16.237997", lng: -16.212559 , label: 'C' }
  ]; */
  openedMarker: MapMarker | null = null;
  expandIndex: number | null = null; // Expand row index, if needed
  alarmes: any[] = [];
  sites: any[] = [];
  alarm: any = [];
  motCle: String = "";
  Currentpage: number = 1;
  size: number = 10;
  pages: any;
  filterAlarme: String = "";
  occurence:any;
  loading: boolean = false;
  status:any = null;
  selectedStatus: any;
  total: number = 0;
  pageSize = 10;
  pageIndex = 1;
  constructor(private alarmeservive:AlarmesService,
    private message: NzMessageService, 
  ) {}

  ngOnInit(): void {
     this.loadMarkers();
    //this.getAlarmes();
  }

   openInfo(marker: MapMarker, infoWindow: MapInfoWindow) {
    if (this.openedMarker) {
      infoWindow.close();
    }
    this.openedMarker = marker; 
    infoWindow.open(marker);
   
  }
  loadMarkers(limit: number = 10, pageIndex: number = 1) {
    this.alarmeservive.getReadData(limit, pageIndex).subscribe(
      response => {
        const markers = response.data;  // Access the 'data' property from the response
        if (Array.isArray(markers)) {
          this.markers = markers.map((marker: any) => ({
            ...marker,
            options: {
              ...this.getMarkerOptions(marker.ul3),
              animation: marker.ul3<220 ? google.maps.Animation.BOUNCE : null
            },
            cssClass: marker.ul3 >220  ? 'critical-marker-animation' : ''
          }));
          console.log(this.markers);  // Log the processed markers
        } else {
          console.error('Error: The markers data is not an array:', markers);
        }
      },
      error => {
        console.error('Error loading markers:', error);
      }
    );
  }
  
   getMarkerOptions(alarm_severity: string) {
    let iconUrl;
    switch (alarm_severity) {
      case 'MAJOR':
        iconUrl = 'assets/images2.png'; 
        break;
      case 'CRITICAL':
        iconUrl = 'assets/images1.png'; 
        break;
      case 'MINOR':
        iconUrl = 'assets/jaune_1.png'; 
        break;
      default:
        iconUrl = 'assets/images2.png';
    }

    return {
      icon: {
        url: iconUrl
      },
      zIndex: 100
    }; 
  }  
    /* public getAlarmes(limit: number =10, pageIndex: number = 1) {
      this.loading = true;
      this.alarmeService.getReadData(limit, pageIndex).subscribe(
        (response: any) => {
          this.markers =  response.data

          console.log('lastdata:',this.markers)
          this.total = response?.total;
          this.loading = false;
          this.message.success('Alarms loaded successfuly !')
        },
      error => {
        this.message.error(error.error.message);
        this.loading = false;
      })
  
    } */
  
}

