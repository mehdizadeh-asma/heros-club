import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Event from "../models/Event";

const initialState: Event[] = [];

const EventSlice = createSlice({
  name: "EventSlice",
  initialState: initialState,
  reducers: {
    AddEvent(state: Event[], action: PayloadAction<Event>) {
      state.push(action.payload);
    },

    SetEventList(_state: Event[], action: PayloadAction<Event[]>) {
      return [...action.payload];
    },

    RemoveEvent(state: Event[], action: PayloadAction<string>) {
      const list = state.filter((Event) => Event._id !== action.payload);
      return [...list];
    },

    EditEvent(state: Event[], action: PayloadAction<Event>) {
      const index = state.findIndex((Event) => Event._id === action.payload._id);
      state[index] = action.payload;
    },
  },
});

export const EventActions = EventSlice.actions;

export default EventSlice;
