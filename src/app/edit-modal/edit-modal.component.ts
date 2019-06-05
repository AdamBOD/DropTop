import { Component, OnInit, AfterViewInit, Input, Renderer2, Inject } from '@angular/core';
import { EventService } from '../shared/services/events.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html'
})
export class EditModalComponent implements OnInit {
  @Input() data: any;

  modalOpened: boolean = false;
  dataName: string;
  userData: string;

  updateEntryForm: FormGroup;

  constructor(private dataService: DataService, 
              private eventService: EventService,
              private formBuilder: FormBuilder,
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.renderModal();
    this.buildForm();
    this.renderer.addClass (this.document.body, 'overlayOpen');
  }

  buildForm () {
    console.log ("Building form");
    this.dataName = this.data.name;
    this.userData = this.data.data;
  }

  renderModal () {
    setTimeout (() => {
      this.modalOpened = true;
    }, 50);
  }

  update (updateEntryData: NgForm) {
    console.log (updateEntryData)
    let name = updateEntryData.value.name;
    let data = updateEntryData.value.dataFromUser;

    var putData = {};
    putData['name'] = name;
    putData['data'] = data;
    putData['_id'] = this.data._id

    console.log (putData)
    
    var putResponse = this.dataService.putData (putData).subscribe (
      data => {
        this.eventService.refreshUserDataEvent();
        this.closeModal()
      },
      error => {
        console.log (error);
      }
    );
  }

  closeModal() {
    this.modalOpened = false;
    setTimeout (() => {
      this.renderer.removeClass (this.document.body, 'overlayOpen');
      this.eventService.closeEditModalEvent();
    }, 300);
  }

}
