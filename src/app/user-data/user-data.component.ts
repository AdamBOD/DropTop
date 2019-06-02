import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { DataTileComponent } from '../data-tile/data-tile.component';
import { EventService } from '../shared/services/events.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html'
})
export class UserDataComponent implements OnInit {
  userData;
  tabsIndex = 1;
  addButtonVisible = true;
  createForm: FormGroup;

  constructor(private dataService: DataService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.dataService.getData()
      .subscribe (res => {
        this.userData = res;
      }, err => {
        console.log (err);
    });

    this.eventService.refreshUserData.subscribe (() => {
      this.dataService.getData()
        .subscribe (res => {
          this.userData = res;
        }, err => {
          console.log (err);
      });

      this.tabsIndex = 1;
    });

    this.eventService.removeUserData.subscribe ((userData) => {
      this.removeUserData(userData)
    });
  }

  private removeUserData (userDataID: UserData) {
    this.userData.forEach((element, index, object) => {
      if (element._id == userDataID) {
        object.splice(index, 1);
      }
    });
  }

  tabChanged (event) {
    if (event.index == 1) {
      this.addButtonVisible = true;
    }
    else {
      this.addButtonVisible = false;
    }
    this.tabsIndex = event.index;
  }

  addNewButtonClicked () {
    this.tabsIndex = 0;
  }
}
