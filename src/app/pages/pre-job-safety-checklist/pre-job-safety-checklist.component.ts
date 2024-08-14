import { Component, OnInit } from '@angular/core';
import { SaftyChecklistService } from '../../service/safty-checklist.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-safety-checklist',
  templateUrl: './pre-job-safety-checklist.component.html',
  styleUrls: ['./pre-job-safety-checklist.component.css']
})
export class PreJobSafetyChecklistComponent implements OnInit {

  safetyChecklistForm?: FormGroup;
  checklistData: any[] = [];
  loading: boolean = false;
  currentTicketId?: string;
  selectedFile: any | null = null;
  imgURL: any;
  images: any[] = [];
  docs: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private checkListService: SaftyChecklistService,
    private route: ActivatedRoute,
    private message: NzMessageService) {}

  ngOnInit(): void {
    this.loadCheckList();
    this.loadCheckListResponse();
    this.loadDocs();
  }

  createForm() {
    const controls = this.checklistData.map(control => {
      return this.fb.group({
        id: [control.id],
        label: [control.label],
        type: [control.type],
        response: ['', Validators.required]
      });
    });

    this.safetyChecklistForm = this.fb.group({
      checklistItems: this.fb.array(controls)
    });
  }

  get checklistItems() {
    return this.safetyChecklistForm?.get('checklistItems') as FormArray;
  }

  loadCheckList (){
    this.loading = true;
     this.checkListService.getSaftyCheckList().
     subscribe(
      res => {
       this.checklistData = res?.data;
       this.createForm();

       this.loading = false;
      },
      error =>{
       this.loading = false;
         
      }
     )
  }


  mapResponse (responses: any[]) {
  //  console.log(this.checklistItems?.controls);
    
    this.checklistItems?.controls?.forEach(item => {

     var  found = responses.filter((v) => v.question.id === item.value?.id)![0];


     if(found){
      item.get('response')?.setValue(found.response)
     }
     
      
    })
    
    console.log(this.checklistItems?.controls);
    
  }
  loadCheckListResponse (){
    this.loading = true;

    this.route.queryParams.subscribe((param) => {
      
      
      this.currentTicketId = undefined;
      if( (param['type'] !== undefined && param['id'] !== undefined ) || param['ticketId'] !== undefined){
        this.currentTicketId = param['id'] !== undefined ? param['id'] :param['ticketId'];
        this.checkListService.getSaftyCheckListResponseByTicketId(this.currentTicketId!).
        subscribe(
         res => {
         // this.checklistData = res?.data;
         // this.createForm();
   
         console.log(res?.data);
         
         this.mapResponse(res?.data)
          this.loading = false;
         },
         error =>{
          this.loading = false;
            
         }
        )
      }})
   
  }

  loadDocs(){
    this.checkListService.loadDocs(this.currentTicketId!)
    .subscribe(
      res => {

       this.docs = res;
      if(this.docs?.length > 0){
        this.getFullImageURL(this.docs)

      }
       
      },
      error => {

      }
    )
    
  }

  saveForm() {
    if (this.safetyChecklistForm!.valid) {
      console.log(this.safetyChecklistForm!.value);
      // Perform save action
    } else {
      console.error('Form is invalid');
    }
  }

  saveRespone(target: any) {
    console.log(target.value);
    var item = target.value;
    this.route.queryParams.subscribe((param) => {
      console.log(param['ticketId'] );
      
      this.currentTicketId = undefined;
      if( (param['type'] !== undefined && param['id'] !== undefined ) || param['ticketId'] !== undefined){
        this.currentTicketId = param['id'] !== undefined ? param['id'] :param['ticketId'];
       var data = {
          responses: [
            {
              questionId: item?.id,
              response: item?.response
            }
          ],
          ticketId: this.currentTicketId
        }

        console.log(data);
        
        this.checkListService.saveSaftyCheckListResponse(data, this.currentTicketId!).
        subscribe(
          res => {
         //  console.log(res);
           this.message.success('Response saved successfuly !');
           this.loadCheckListResponse();
           
          },
          error => {
            console.log(error);
            
          }
        )

      }
      
    })

    
    }


    onFileSelected(event: any,) {
      
      this.selectedFile = event.target.files[0];
  
      this.onUpload(this.currentTicketId!);
  
    }
  
    onUpload(id: string) {
      if (!this.selectedFile) {
        alert('Please select a file first');
        return;
      }
  
      const uploadData = new FormData();
      uploadData.append('file', this.selectedFile, this.selectedFile.name);
  
  
      this.checkListService.uploadImage(uploadData, this.currentTicketId)
        .subscribe(
          response => {
            this.message.success('Uploaded Successfully !');
            this.loadDocs();
          
          },
          error => {
            console.error(error);
            this.message.error(error?.error?.messages[0] ?? 'Upload Failed')
          }
        );
    }
  
    getFullImageURL(docs: any[]) {
    docs.map((data: any) => {
      console.log(data);
      
        this.checkListService.loadImage(data.fileName)
          .subscribe(image => {

            console.log(image);
            
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
}
