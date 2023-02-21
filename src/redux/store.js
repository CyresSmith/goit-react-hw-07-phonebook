import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filterReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
