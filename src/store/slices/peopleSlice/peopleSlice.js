import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAllPeople,
  fetchPeopleByID,
  createPeople,
  updatePeople,
  deletePeople,
} from "./thunk";

const initialState = {
  People: [],
  singlePerson: {},
  error: false,
};

const peopleSlice = createSlice({
  name: "peopleSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get All People ( fetchAllPeople )
    builder.addCase(fetchAllPeople.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchAllPeople.fulfilled, (state, action) => {
      state.error = null;
      state.People = action.payload;
    });
    builder.addCase(fetchAllPeople.rejected, (state, action) => {
      state.error = action.error.message;
    });

    //Get People by id ( fetchPeopleByID )
    builder.addCase(fetchPeopleByID.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchPeopleByID.fulfilled, (state, action) => {
      state.error = null;
      state.singlePerson = action.payload;
    });
    builder.addCase(fetchPeopleByID.rejected, (state, action) => {
      state.error = action.error.message;
    });

    //Update People by id ( updatePeople )
    builder.addCase(updatePeople.pending, (state) => {
      state.error = null;
    });
    builder.addCase(updatePeople.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(updatePeople.rejected, (state, action) => {
      state.error = action.error.message;
    });

    //Create People by id ( createPeople )
    builder.addCase(createPeople.pending, (state) => {
      state.error = null;
    });
    // builder.addCase(createPeople.fulfilled, (state, action) => {
    // });
    builder.addCase(createPeople.rejected, (state, action) => {
      state.error = action.error.message;
    });

    //Delete People by id ( deletePeople )
    builder.addCase(deletePeople.pending, (state) => {
      state.error = null;
    });
    builder.addCase(deletePeople.fulfilled, (state) => {
      state.error = false;
    });
    builder.addCase(deletePeople.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default peopleSlice.reducer;
