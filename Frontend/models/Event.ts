import axios from "axios";
import { EventActions } from "../store/EventSlice";
import store from "store";
import Helper from "utils/Helper";
import { AnyAction } from "@reduxjs/toolkit";
import Field from "./Field";

export enum StatusType {
  Active = "Active",
  Deactive = "Deactive",
  Running = "Running",
  Waiting = "Waiting",
  Done = "Done",
}

export enum PaymentType {
  Free = "FREE",
  Cost = "Cost",
}

class Event {
  constructor(
    public _id: string,
    public Title: string,
    public EventDate: Date,
    public Status: StatusType,
    public PaymentType: PaymentType,
    public ImageUrl?: string,
    public Address?: string,
    public Cost?: string,
    public FieldId?: string,
    public Geolocation?: string,
    public Field?: Field
  ) {}

  public static async Get(): Promise<AnyAction> {
    const response = await axios({
      url: Helper.BACKEND_URL + "/admin/events",
      method: "GET",
    });

    return store.dispatch(EventActions.SetEventList(response.data));
  }

  public static GetByID(id: string): Event | undefined {
    const EventList: Event[] = store.getState().Events;

    const Event = EventList.find((Event) => Event._id === id);

    if (!Event) return undefined;

    // this._id = id;
    // this.Title = Event.Title;
    // this.ImageUrl = Event.ImageUrl;
    // this.Status = Event.Status;
    return Event;
  }

  public async Add(): Promise<AnyAction> {
    const response = await axios({
      url: Helper.BACKEND_URL + "/admin/Event",
      method: "POST",
      data: this,
    });
    return store.dispatch(EventActions.AddEvent(response.data));
  }

  public async Edit(): Promise<AnyAction> {
    const response = await axios({
      url: Helper.BACKEND_URL + "/admin/Event/" + this._id,
      method: "PUT",
      data: this,
    });
    return store.dispatch(EventActions.EditEvent(response.data));
  }

  public static async Remove(_id: string): Promise<AnyAction> {
    await axios({
      url: Helper.BACKEND_URL + "/admin/Event/" + _id,
      method: "DELETE",
    });
    return store.dispatch(EventActions.RemoveEvent(_id));
  }
}

export default Event;
