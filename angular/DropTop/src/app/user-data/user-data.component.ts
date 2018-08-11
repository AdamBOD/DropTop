import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { DataTileComponent } from '../data-tile/data-tile.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html'
})
export class UserDataComponent implements OnInit {
  userData;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData()
      .subscribe (res => {
        this.userData = res;
      }, err => {
        console.log (err);
      });
  }

}
