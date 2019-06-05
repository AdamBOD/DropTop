import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class EventService {

  @Output() refreshUserData: EventEmitter<boolean> = new EventEmitter();
  @Output() removeUserData: EventEmitter<UserData> = new EventEmitter();
  @Output() createEditModal: EventEmitter<UserData> = new EventEmitter();
  @Output() closeEditModal: EventEmitter<boolean> = new EventEmitter();

  public refreshUserDataEvent () {
    this.refreshUserData.emit(true);
  }

  public removeUserDataEvent (userData: UserData) {
    this.removeUserData.emit(userData);
  }

  public createEditModalEvent (data: UserData) {
    this.createEditModal.emit (data);
  }

  public closeEditModalEvent () {
    this.closeEditModal.emit (true);
  }
}