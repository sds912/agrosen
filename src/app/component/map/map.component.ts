import { ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MapInfoWindow,MapMarker,} from '@angular/google-maps';
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
  /* markers = [
    { id: 1,  lat: "14.7645042", lng: "-17.3660286" , label: 'A' },
    { id: 2,  lat: "14.791005", lng: "-16.935860 ", label: 'B' },
    { id: 3,  lat: "16.237997", lng: -16.212559 , label: 'C' }
  ]; */
  openedMarker: MapMarker | null = null;
  constructor(private alarmeservive:AlarmesService) {}

  ngOnInit(): void {
    this.loadMarkers();
  }

  openInfo(marker: MapMarker, infoWindow: MapInfoWindow) {
    if (this.openedMarker) {
      infoWindow.close();
    }
    this.openedMarker = marker; 
    infoWindow.open(marker);
   
  }
  loadMarkers() {
    this.alarmeservive.getMarkers().subscribe(
      markers => {
        this.markers = markers.map(marker => ({
          ...marker,
          options: {
            ...this.getMarkerOptions(marker.alarm_severity),
            animation: marker.alarm_severity === 'CRITICAL' ? google.maps.Animation.BOUNCE : null
          },
          cssClass: marker.alarm_severity === 'CRITICAL' ? 'critical-marker-animation' : ''
        }));
        
        console.log(markers);
      },
      error => {
        console.log('Une erreur s\'est produite lors du chargement des marqueurs :', error);
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
}

