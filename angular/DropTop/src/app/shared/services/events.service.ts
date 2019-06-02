import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class EventService {

  @Output() refreshUserData: EventEmitter<boolean> = new EventEmitter();
  @Output() removeUserData: EventEmitter<UserData> = new EventEmitter();

  public refreshUserDataEvent() {
    this.refreshUserData.emit(true);
  }

  public removeUserDataEvent(userData: UserData) {
    this.removeUserData.emit(userData);
  }

}