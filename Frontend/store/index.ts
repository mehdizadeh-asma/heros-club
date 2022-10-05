import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";

import fieldSlice from "./FieldSlice";
import eventSlice from "./EventSlice";
import Field from "models/Field";
import Event from "models/Event";

export type StoreType = { Fields: Field[]; Events: Event[] };

const store = configureStore<StoreType, AnyAction>({
  reducer: combineReducers({ Fields: fieldSlice.reducer, Events: eventSlice.reducer }),
});

export default store;
