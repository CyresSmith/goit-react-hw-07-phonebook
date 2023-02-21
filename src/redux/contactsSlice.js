import { createSlice } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact(state, action) {
      const { name } = action.payload;
      const normalizedName = name.toLowerCase();

      const dublicate = state.find(
        ({ name }) => name.toLowerCase().trim() === normalizedName
      );

      if (dublicate) {
        Notify.failure(`${name} already in contacts`, {
          showOnlyTheLastOne: true,
          position: 'right-bottom',
        });
      } else {
        state.push(action.payload);
      }
    },

    removeContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
