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
  actionButtonText: string = "Create Entry";
  buttonDisabled: boolean = false;

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
    this.actionButtonText = "";
    this.buttonDisabled = true;

    let name = createEntryData.value.name;
    let data = createEntryData.value.dataFromUser;

    var postData = {};
    postData['name'] = name;
    postData['data'] = data;
    
    var postResponse = this.dataService.postData (postData).subscribe (
      data => {
        this.actionButtonText = "Create Entry";
        this.buttonDisabled = false;

        createEntryData.reset();
        this.createdHandler();
      },
      error => {
        this.actionButtonText = "Create Entry";
        this.buttonDisabled = false;
        console.log (error);
      }
    );
  }

  createdHandler () {
    this.eventService.refreshUserDataEvent();
  }

}
