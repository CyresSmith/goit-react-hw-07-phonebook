import { createSlice } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchContacts, addContact, removeContact } from './operations';

const contactsInitialState = {
  myContacts: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.myContacts = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,

    // ============================

    [addContact.pending]: handlePending,

    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.myContacts.push(action.payload);
    },

    [addContact.rejected]: handleRejected,

    // ============================

    [removeContact.pending]: handlePending,

    [removeContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.myContacts = state.myContacts.filter(
        contact => contact.id !== action.payload.id
      );
    },

    [removeContact.rejected]: handleRejected,
  },
});

export const { fetchingInProgress, fetchingSucces, fetchingError } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
