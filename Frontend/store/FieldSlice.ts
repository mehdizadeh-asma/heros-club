import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Field from "../models/Field";

const initialState: Field[] = [];

const fieldSlice = createSlice({
  name: "FieldSlice",
  initialState: initialState,
  reducers: {
    AddField(state: Field[], action: PayloadAction<Field>) {
      state.push(action.payload);
    },

    SetFieldList(_state: Field[], action: PayloadAction<Field[]>) {
      return [...action.payload];
    },

    RemoveField(state: Field[], action: PayloadAction<string>) {
      const list = state.filter((field) => field._id !== action.payload);
      return [...list];
    },

    EditField(state: Field[], action: PayloadAction<Field>) {
      const index = state.findIndex((field) => field._id === action.payload._id);
      state[index] = action.payload;
    },
  },
});

export const FieldActions = fieldSlice.actions;

export default fieldSlice;
