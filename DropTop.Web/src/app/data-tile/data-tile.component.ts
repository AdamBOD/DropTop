import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { EventService } from '../shared/services/events.service';

@Component({
  selector: 'app-data-tile',
  templateUrl: './data-tile.component.html'
})
export class DataTileComponent implements OnInit {
  @Input() data;
  isEditing = false;
  isURL = false;
  dataURL;
  disabled = true;
  tileDeleted = false;
  clipboardCopied = false;

  constructor(private dataService: DataService,
              private eventService: EventService,
              private viewRef: ViewContainerRef) { }

  ngOnInit() {
    this.isURL = this.isUrl(this.data.data);
    if (this.isURL) {
      if (this.hasProtocol(this.data.data)) {
        this.dataURL = this.data.data;
      } else {
        this.dataURL = `http://${this.data.data}`;
      }
    }
  }

  private isUrl(str): boolean {
    var regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    return regexp.test(str);
  }

  private hasProtocol(str): boolean {
    var regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/gm;
    return regexp.test(str);
  }

  public editTile () {
    this.dataService.getDataById(this.data.id)
        .subscribe (res => {
          this.eventService.createEditModalEvent (res);
        }, err => {
          console.log (err);
      });
  }

  public copyTileData (clipboardArea) {
    this.disabled = false;
      
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (clipboardArea.value));
      e.preventDefault();
      document.removeEventListener('copy', null);
      this.clipboardCopied = true;
      this.disabled = true;
    });
    document.execCommand('copy');
    
    setTimeout (() => {
      this.clipboardCopied = false;
    }, 5000);
  }

  public deleteTile () {
    this.eventService.createDeleteModalEvent (this.data);

    this.eventService.deleteSuccessful.subscribe (() => {      
      this.tileDeleted = true;

      window.setTimeout (() => {
        this.removeTial();
      }, 400);
    });
    
  }

  private removeTial () {
    this.eventService.removeUserDataEvent(this.data._id);
  }
}
