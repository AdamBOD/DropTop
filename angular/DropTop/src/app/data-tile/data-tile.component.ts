import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-tile',
  templateUrl: './data-tile.component.html'
})
export class DataTileComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
