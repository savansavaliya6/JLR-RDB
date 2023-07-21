// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";
import { toast } from "react-hot-toast";

export const getData = createAsyncThunk(
  "datatables2/getData",
  async (params) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.get(
      "https://rdbapi.vnvserver.com/sales/list",
      {
        params,
        headers: {
          token: user.token,
        },
      }
    );
    const allData = response.data.data;
    return {
      allData: allData.rows,
      totalPages: parseInt(Math.ceil(allData.count / params.perPage)),
      data: response.data.data.rows.splice(
        parseInt(params.perPage) * (params.page - 1),
        parseInt(params.perPage)
      ),
      total_count: response.data.total_count,
      params,
    };
  }
);
export const getDropdownValue = createAsyncThunk(
  "datatables2/getDropdownValue",
  async (params) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.get(
      "https://rdbapi.vnvserver.com/sales/filter",
      {
        params,
        headers: {
          token: user.token,
        },
      }
    );
    const allData = response.data.data;

    return {
      allData: allData.rows,
      // totalPages: parseInt(Math.ceil(allData.count / params.perPage)),
      data: response.data.data.rows.splice(
        parseInt(params.perPage) * (params.page - 1),
        parseInt(params.perPage)
      ),
      // total_count: response.data.total_count,
      params,
    };
  }
);
export const deleteUser = createAsyncThunk(
  "datatables2/deleteUser",
  async (id, { dispatch, getState }) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.delete(
      "https://rdbapi.vnvserver.com/customer/delete",
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
  "datatables2/updateUser",
  async (data, { dispatch, getState }) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.put(
      `https://rdbapi.vnvserver.com/sales/update/${data.id}`,
      { data: data },
      {
        headers: {
          token: user.token,
        },
      }
    );
    if (response.data.status === 200) {
      toast.success(response.data.message);
      dispatch(
        getData({
          page: getState().datatables2.params.page,
          perPage: getState().datatables2.params.perPage,
          q: getState().datatables2.params.q,
        })
      );
    } else if (response.data.status !== 200) {
      toast.error(response.data.message);
      return response.data;
    }
  }
);
export const addUser = createAsyncThunk(
  "datatables2/addUser",
  async (data, { dispatch, getState }) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.post(
      "https://rdbapi.vnvserver.com/sales/create",
      { data: data },
      {
        headers: {
          token: user.token,
        },
      }
    );
    if (response.data.status === 200) {
      toast.success(response.data.message);
      dispatch(
        getData({
          page: getState().datatables2.params.page,
          perPage: getState().datatables2.params.perPage,
          q: getState().datatables2.params.q,
        })
      );
    } else if (response.data.status != 200) {
      toast.error(response.data.message);
      return response.data;
    }
  }
);
export const datatablesSlice = createSlice({
  name: "datatables2",
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: [],
    responseData: "",
    totalCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.params = action.payload.params;
      state.allData = action.payload.allData;
      state.responseData = action.payload.responseData;
      state.total = action.payload.totalPages;
      state.totalCount = action.payload.total_count;
    });
    builder.addCase(getDropdownValue.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.params = action.payload.params;
      state.allData = action.payload.allData;
    });
  },
});

export default datatablesSlice.reducer;
