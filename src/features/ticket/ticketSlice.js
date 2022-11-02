import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  isloading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      console.log(action.payload);
      state.tickets.push(action.payload);
    },
    editTicket: (state, action) => {
      // console.log(action.payload);
      const { id, formData } = action.payload;
      // let index = state.tickets.findIndex((ticket) => id === ticket.ticketId);
      // // ticket = { ...formData };
      // state.tickets.splice(index, 1, formData); // first para is index from where deleting start, second para is no. of item to delete, third is to replace that deleted item
      //or
      state.tickets = state.tickets.map((ticket) =>
        ticket.ticketId === id ? formData : ticket
      );
    },
    deleteTicket: (state, action) => {
      // console.log(action.payload);
      const id = action.payload;
      state.tickets = state.tickets.filter((ticket) => ticket.ticketId !== id);
    },
  },
});

// console.log(ticketSlice);

export const { addTicket, editTicket, deleteTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
