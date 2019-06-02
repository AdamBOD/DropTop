import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private dataService: DataService,
              private eventService: EventService) { }

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

  public copyTileData (clipboardArea) {
    clipboardArea.focus();
    clipboardArea.select();
    document.execCommand("copy");
  }

  public deleteTile () {    
    this.dataService.deleteData (this.data).subscribe (
      data => {
        this.removeTial();
      },
      error => {
        console.log (error);
      }
    );
  }

  private removeTial () {
    this.eventService.removeUserDataEvent(this.data._id);
  }
}
