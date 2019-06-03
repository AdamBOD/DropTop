import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { EventService } from 'src/app/shared/services/events.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html'
})
export class CreateFormComponent implements OnInit {
  createEntryForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private eventService: EventService) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm () {
    this.createEntryForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        dataFromUser: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  create (createEntryData: NgForm) {
    console.log (createEntryData)
    let name = createEntryData.value.name;
    let data = createEntryData.value.dataFromUser;

    var postData = {};
    postData['name'] = name;
    postData['data'] = data;

    console.log (postData)
    
    var postResponse = this.dataService.postData (postData).subscribe (
      data => {
        createEntryData.reset();
        this.createdHandler();
      },
      error => {
        console.log (error);
      }
    );
    console.log (postResponse);
  }

  createdHandler () {
    this.eventService.refreshUserDataEvent();
  }

}
