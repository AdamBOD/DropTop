import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html'
})
export class EditModalComponent implements OnInit {
  @Input() dataName: string;
  @Input() data: string;

  modalOpened: boolean = false;

  constructor(private viewContainerRef:ViewContainerRef) { }

  ngOnInit() {
    this.modalOpened = true;
  }

  closeModal() {
    this.modalOpened = false;
    setTimeout (() => {
      this.viewContainerRef
        .element
        .nativeElement
        .parentElement
        .removeChild(this.viewContainerRef.element.nativeElement);
    }, 300);
    
  }

}
