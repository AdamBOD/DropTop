import { Component, OnInit, AfterViewInit, Input, Renderer2, Inject } from '@angular/core';
import { EventService } from '../shared/services/events.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html'
})
export class DeleteModalComponent implements OnInit {
  @Input() data: any;

  modalOpened: boolean = false;

  constructor(private dataService: DataService, 
              private eventService: EventService,
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.renderModal();
    this.renderer.addClass (this.document.body, 'overlayOpen');
  }

  renderModal () {
    setTimeout (() => {
      this.modalOpened = true;
    }, 50);
  }

  deleteData () {
    window.setTimeout (() => {
      this.dataService.deleteData (this.data).subscribe (
        () => {
          this.closeModal();
          this.eventService.deleteSuccessfulEvent();
        },
        error => {
          console.log (error);
        }
      );
    }, 500);
  }

  closeModal() {
    this.modalOpened = false;
    setTimeout (() => {
      this.renderer.removeClass (this.document.body, 'overlayOpen');
      this.eventService.closeDeleteModalEvent();
    }, 300);
  }

}
