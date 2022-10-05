import axios from "axios";
import { FieldActions } from "../store/FieldSlice";
import store from "store";
import Helper from "utils/Helper";
import { AnyAction } from "@reduxjs/toolkit";

export enum StatusType {
  Active = "Active",
  Deactive = "Deactive",
}

class Field {
  constructor(
    public _id: string,
    public Title: string,
    public ImageUrl?: string,
    public Status?: StatusType
  ) {}

  public static async Get(): Promise<AnyAction> {
    const response = await axios({
      url: Helper.BACKEND_URL + "/admin/fields",
      method: "GET",
    });

    return store.dispatch(FieldActions.SetFieldList(response.data));
  }

  public static GetByID(id: string): Field | undefined {
    const fieldList = store.getState().Fields;

    const field = fieldList.find((field) => field._id === id);

    if (!field) return undefined;

    return field;
  }

  public async Add(): Promise<AnyAction> {
    const response = await axios({
      url: Helper.BACKEND_URL + "/admin/field",
      method: "POST",
      data: this,
    });
    return store.dispatch(FieldActions.AddField(response.data));
  }

  public async Edit(): Promise<AnyAction> {
    const response = await axios({
      url: Helper.BACKEND_URL + "/admin/field/" + this._id,
      method: "PUT",
      data: this,
    });
    return store.dispatch(FieldActions.EditField(response.data));
  }

  public static async Remove(_id: string): Promise<AnyAction> {
    await axios({
      url: Helper.BACKEND_URL + "/admin/field/" + _id,
      method: "DELETE",
    });
    return store.dispatch(FieldActions.RemoveField(_id));
  }
}

export default Field;
