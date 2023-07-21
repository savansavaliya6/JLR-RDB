import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Loader from "react-js-loader";
// ** Axios Imports
import axios, { all } from "axios";
import { toast } from "react-hot-toast";

export const getData = createAsyncThunk(
    "vehicleReports/getData",
    async (params) => {
        const user = JSON.parse(sessionStorage.getItem("userData"));

        const response = await axios.get(
            "https://rdbapi.vnvserver.com/Vehicles/Reports",
            {
                params,
                headers: {
                    token: user.token,
                },
            }
        );

        const allData = response.data;
        console.log('res', allData)
        return {
            allData: allData.vehicle_report,
            totalPages: parseInt(Math.ceil(allData.Count / params.perPage)),
            // data: response.data.data.rows.splice(
            //     parseInt(params.perPage) * (params.page - 1),
            //     parseInt(params.perPage)
            // ),
            // total_count: response.data.total_count,
            params,
        };
    }
);
export const vehicleReportsSlice = createSlice({
    name: "vehicleReports",
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
        // builder.addCase(getDropdownValue.fulfilled, (state, action) => {
        //     state.data = action.payload.data;
        //     state.params = action.payload.params;
        //     state.allData = action.payload.allData;
        // });
    },
});
export default vehicleReportsSlice.reducer;
