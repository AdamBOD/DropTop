import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { EventService } from '../shared/services/events.service';
import { browser } from 'protractor';

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
            if (res.length > 0) {
                this.userData = res;
            }
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
      window.setTimeout(() => {
        window.scrollTo({
          top: (this.userData.length * 200) + 65,
          behavior: 'smooth'
        });
      }, 500);
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
