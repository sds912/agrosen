import { Component, Input, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticket.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IMAGE_TYPES, TiCKET_STATE } from '../../shared/app-constants';

@Component({
  selector: 'app-ticket-image-manager',
  templateUrl: './ticket-image-manager.component.html',
  styleUrl: './ticket-image-manager.component.css'
})
export class TicketImageManagerComponent implements OnInit{

  @Input() ticket: any;
  selectedFile: any | null = null;
  imgURL: any;
  docAfterMaints: any[] = [];
  docBeforeMaints: any[] = [];
  scrollPosition: number = 0;
  TICKETSTATUS = TiCKET_STATE;
  docSenelectMeter: any[] = [];
  docFluentBattery: any[] = [];
  docBattryVoltage: any[] = [];

  IMAGE_TYPE = IMAGE_TYPES;
  
  constructor(private ticketService: TicketService, private message: NzMessageService){

  }

  ngOnInit(): void {

     if(this.ticket && this.ticket.documents){
      console.log(this.ticket.documents);
      
      this.docDispatcher(this.ticket?.documents);
     }
  }


  onFileSelected(event: any, type: string) {
    
    const fileInput =  event.target;
    this.selectedFile = fileInput.files[0];

   this.onUpload(this.ticket?.id, type);
    fileInput.value = '';
  }

  onUpload(id: string, type: string) {
    if (!this.selectedFile) {
      alert('Please select a file first');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);


    this.ticketService.uploadImage(uploadData, id, type)
      .subscribe(
        response => {
          this.message.success('Uploaded Successfully !');
         // this.loadTicketById(this.ticket.id)
        location.reload()
        },
        error => {
          console.error(error);
          this.message.error(error?.error?.messages[0] ?? 'Upload Failed')
        }
      );
  }

  getFullImageURL() {
    this.ticket.documents.map((data: any) => {
      this.ticketService.loadImage(data.fileName)
        .subscribe(image => {
          data.imageData = this.convertToBase64(image);
        },
          error => {

            this.message.error('Flail to load images');

          })
    })

  }

  convertToBase64(buffer: ArrayBuffer): any {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/png;base64,' + btoa(binary);
  }


  docDispatcher = (docs: any[]) => {
    this.docBeforeMaints = docs?.filter((v) => v.afterMaintenance === false );
    this.docAfterMaints = docs?.filter((v) =>   v.afterMaintenance === true );
    this.docSenelectMeter = docs?.filter((v) => v.senelecMeter === true);
    this.docFluentBattery = docs?.filter((v) => v.fluentBattery === true );
    this.docBattryVoltage = docs?.filter((v) => v.batteryVoltage === true );

  }



  
}
