import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

export const addReport = createAsyncThunk(
  "datatables/addReport",
  async (data, { dispatch, getState }) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.post(
      "https://rdbapi.vnvserver.com/register", //submit report
      { data },
      {
        headers: {
          token: user.token,
        },
      }
    );
    if (response.data.status === 200) {
      //   toast.success("Report Submitted Successfully!");
      dispatch(
        getData({
          page: getState().datatables.params.page,
          perPage: getState().datatables.params.perPage,
          q: getState().datatables.params.q,
        })
      );
    } else if (response.data.status != 200) {
      toast.error(response.data.msg);
      return response.data;
    }
  }
);

export const getReportLeads = createAsyncThunk(
  "datatables/getReportLeads",
  async (params) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.get(
      "https://rdbapi.vnvserver.com/api/report/leads", //value of x and y axis
      {
        params,
        headers: {
          token: user.token,
        },
      }
    );
    const allData = response.data.data;
    return {
      allData: allData,

      params,
    };
  }
);
export const datatablesSlice = createSlice({
  name: "datatables",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export default datatablesSlice.reducer;
