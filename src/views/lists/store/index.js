// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";

export const getData = createAsyncThunk(
  "datatables/getData",
  async (params) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.get(
      "https://rdbapi.vnvserver.com/users",
      {
        params,
        headers: {
          token: user.token,
        },
      }
    );
    const allData = response.data.data;
    console.log("datalist", allData);

    return {
      allData: allData,
      totalPages: parseInt(Math.ceil(allData.length / params.perPage)),
      data: response.data.data.splice(
        parseInt(params.perPage) * (params.page - 1),
        parseInt(params.perPage)
      ),
      params,
    };
  }
);

export const deleteUser = createAsyncThunk(
  "datatables/deleteUser",
  async (id, { dispatch, getState }) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.delete(
      "https://rdbapi.vnvserver.com/user/delete",
      {
        params: { id },
        headers: {
          token: user.token,
        },
      }
    );
    await dispatch(
      getData({
        page: 1,
        perPage: 7,
        q: "",
      })
    );
  }
);
export const updateUser = createAsyncThunk(
  "datatables/updateUser",
  async (data, { dispatch, getState }) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.put(
      "https://rdbapi.vnvserver.com/user/update",
      { data: data },
      {
        headers: {
          token: user.token,
        },
      }
    );
    dispatch(
      getData({
        page: getState().datatables.params.page,
        perPage: getState().datatables.params.perPage,
        q: getState().datatables.params.q,
      })
    );
  }
);
export const addUser = createAsyncThunk(
  "datatables/addUser",
  async (data, { dispatch, getState }) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.post(
      "https://rdbapi.vnvserver.com/register",
      { data },
      {
        headers: {
          token: user.token,
        },
      }
    );
    if (response.data.status === 200) {
      dispatch(
        getData({
          page: getState().datatables.params.page,
          perPage: getState().datatables.params.perPage,
          q: getState().datatables.params.q,
        })
      );
    } else {
      return response.data;
    }
  }
);
export const datatablesSlice = createSlice({
  name: "datatables",
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: [],
    responseData: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.params = action.payload.params;
      state.allData = action.payload.allData;
      state.responseData = action.payload.responseData;
      state.total = action.payload.totalPages;
    });
  },
});

export default datatablesSlice.reducer;
