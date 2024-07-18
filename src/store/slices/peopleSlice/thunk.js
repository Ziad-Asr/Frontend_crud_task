import { createAsyncThunk } from "@reduxjs/toolkit";

import { useGetDataToken } from "../../../hooks/useGetData";
import { useUpdateData } from "../../../hooks/useUpdateData";
import { useGetData } from "../../../hooks/useGetData";
import { useInsertData } from "../../../hooks/useInsertData";
import useDeleteData from "../../../hooks/useDeleteData";

// Get All People
export const fetchAllPeople = createAsyncThunk(
  "/People/fetchAllPeople",
  async () => {
    const response = await useGetDataToken("/");

    console.log("response");
    console.log(response);
    return response.data;
  }
);

// Get People by id
export const fetchPeopleByID = createAsyncThunk(
  "/People/fetchPeopleeById",
  async (id) => {
    try {
      const response = await useGetData(`?id=${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Create People
export const createPeople = createAsyncThunk(
  "/People/createPeople",
  async (data) => {
    const response = await useInsertData(`/`, data);
    return response;
  }
);

// Update People
export const updatePeople = createAsyncThunk(
  "/People/updatePeople",
  async (data) => {
    const response = await useUpdateData(`?id=${data[0]}`, data[1]);
    return [response.data];
  }
);

// delete People
export const deletePeople = createAsyncThunk(
  "/People/deletePeople",
  async (id) => {
    console.log("deletePeople thunk");
    const response = await useDeleteData(`?id=${id}`);

    console.log("respone");
    console.log(response);
    return response;
  }
);
