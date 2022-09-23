import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Field from "../models/Field";

export type StateType = { items: Field[] };

const initialState: StateType = { items: [] };

const fieldSlice = createSlice({
  name: "FieldSlice",
  initialState: initialState,
  reducers: {
    AddField(state: StateType, action: PayloadAction<Field>) {
      state.items.push(action.payload);
    },

    SetFieldList(state: StateType, action: PayloadAction<StateType>) {
      return { ...state, items: action.payload.items };
    },

    RemoveField(state: StateType, action: PayloadAction<string>) {
      const list = state.items.filter((field) => field._id !== action.payload);
      return { ...state, items: list };
    },

    EditField(state: StateType, action: PayloadAction<Field>) {
      const index = state.items.findIndex((field) => field._id === action.payload._id);
      state.items[index] = action.payload;
    },
  },
});

export const FieldActions = fieldSlice.actions;

export default fieldSlice;
