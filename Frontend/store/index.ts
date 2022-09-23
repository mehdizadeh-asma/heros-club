import { configureStore } from "@reduxjs/toolkit";

import fieldSlice from "./FieldSlice";

const store = configureStore({ reducer: fieldSlice.reducer });

export default store;
