import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-tile',
  templateUrl: './data-tile.component.html'
})
export class DataTileComponent implements OnInit {
  @Input() data;
  isEditing = false;
  isURL = false;
  dataURL;

  constructor() { }

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

  isUrl(str): boolean {
    var regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/.|www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    return regexp.test(str);
  }

  hasProtocol(str): boolean {
    var regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/gm;
    return regexp.test(str);
  }

  openTileData () {
    console.log (this.data);
  }
}
