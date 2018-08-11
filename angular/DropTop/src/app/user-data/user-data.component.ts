import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { DataTileComponent } from '../data-tile/data-tile.component';

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
              private formBuilder: FormBuilder) {
                //this.buildForm();
  }

  ngOnInit() {
    this.dataService.getData()
      .subscribe (res => {
        this.userData = res;
      }, err => {
        console.log (err);
    });

    // this.createForm.setValue ({
    //   name: '',
    //   dataFromUser: ''
    // });
  }

  buildForm () {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      dataFromUser: ['', [Validators.required]]
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

  createEntry (createEntryData) {
    console.log (createEntryData);
  }
}
