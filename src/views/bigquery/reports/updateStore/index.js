// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Loader from "react-js-loader";
// ** Axios Imports
import axios from "axios";
import { toast } from "react-hot-toast";

export const getData = createAsyncThunk(
  "updateReport/getData",
  async (params) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.get(
      "https://rdbapi.vnvserver.com/bigquery/filter/data",
      {
        params,
        headers: {
          token: user.token,
        },
      }
    );

    const allData = response.data;
    console.log(response);
    return {
      allData: allData.ex1,
      totalPages: parseInt(Math.ceil(allData.count / params.perPage)),
      // data: response.data.data.rows.splice(
      //   parseInt(params.perPage) * (params.page - 1),
      //   parseInt(params.perPage)
      // ),
      // total_count: response.data.total_count,
      params,
    };
  }
);

// export const getDropdownValue = createAsyncThunk(
//     "updateReport/getDropdownValue",
//     async (params) => {
//         // console.log("params---", params);
//         const response = await axios.get(
//             "https://rdbapi.vnvserver.com/user/filter",
//             {
//                 params,
//                 headers: {
//                     token: user.token,
//                 },
//             }
//         );
//         const allData = response.data.data;
//         // console.log("allData", allData);
//         return {
//             allData: allData.rows,
//             // totalPages: parseInt(Math.ceil(allData.count / params.perPage)),
//             data: response.data.data.rows.splice(
//                 parseInt(params.perPage) * (params.page - 1),
//                 parseInt(params.perPage)
//             ),
//             // total_count: response.data.total_count,
//             params,
//         };
//     }
// );
// export const deleteUser = createAsyncThunk(
//     "updateReport/deleteUser",
//     async (id, { dispatch, getState }) => {
//         const response = await axios.delete(
//             `https://rdbapi.vnvserver.com/bigquery/delete/${id}`
//         );
//         await dispatch(
//             getData({
//                 page: 1,
//                 perPage: 7,
//                 q: "",
//             })
//         );
//     }
// );
// export const addUser = createAsyncThunk(
//     "updateReport/addUser",
//     async (data, { dispatch, getState }) => {
//         const response = await axios.post(
//             "https://rdbapi.vnvserver.com/bigquery/user",
//             data,
//             {
//                 headers: {
//                     token: user.token,
//                 },
//             }
//         );
//         console.log(response);
//         if (response.data.status === 200) {
//             toast.success(response.data.msg);
//             dispatch(
//                 getData({
//                     page: getState().updateReport.params.page,
//                     perPage: getState().updateReport.params.perPage,
//                     q: getState().updateReport.params.q,
//                 })
//             );
//         } else if (response.data.status != 200) {
//             toast.error(response.data.message);
//             return response.data;
//         }
//     }
// );

export const updateUser = createAsyncThunk(
  "updateReport/updateUser",
  async (data, { dispatch, getState }) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.put(
      `https://rdbapi.vnvserver.com/bigquery/unique`,
      { result: data },
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
          page: getState().updateReport.params.page,
          perPage: getState().updateReport.params.perPage,
          q: getState().updateReport.params.q,
        })
      );
    } else if (response.data.status != 200) {
      toast.error(response.data.msg);
      return response.data;
    }
  }
);

export const updateReportSlice = createSlice({
  name: "updateReport",
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
      // state.data = action.payload.data;
      state.params = action.payload.params;
      state.allData = action.payload.allData;
      // state.responseData = action.payload.responseData;
      state.total = action.payload.totalPages;
      // state.totalCount = action.payload.total_count;
    });
  },
});

export default updateReportSlice.reducer;
