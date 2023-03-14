import axios from "axios";
import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { BASE_URL } from "../../utills/constants";

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/categories`)
            return res.data
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
}
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        isLoading: false
    },
    reducers: {

    },
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.isLoading = true
        },
        [getCategories.fulfilled]: (state, action) => {
            state.list = action.payload
            state.isLoading = false
        },
        [getCategories.rejected]: (state) => {
            state.isLOading = false
        }
    }
    // extraReducers: (builder) => {
    //     builder.addCase(getCategories.pending, (state, action) => {
    //         state.isLoading = true
    //     });
    //     builder.addCase(getCategories.fulfilled, (state, action) => {
    //         state.list = action.payload
    //         state.isLoading = false
    //     });
    //     builder.addCase(getCategories.rejected, (state, action) => {
    //         state.isLoading = false
    //     });
    // }
})

export default categoriesSlice.reducer