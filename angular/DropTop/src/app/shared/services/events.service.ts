import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class EventService {

  @Output() refreshUserData: EventEmitter<boolean> = new EventEmitter();

  refreshUserDataEvent() {
    this.refreshUserData.emit(true);
  }

}