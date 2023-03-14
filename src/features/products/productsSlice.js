import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../utills/constants";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/products`)
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        filtered: [],
        // related: [],
        isLoading: false
    },
    reducers: {
        filterByPrice: (state, action) => {
            state.filtered = state.list.filter(({ price }) => price < action.payload)
        }
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.isLoading = true
        },
        [getProducts.fulfilled]: (state, action) => {
            state.list = action.payload
            state.isLoading = false
        },
        [getProducts.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export const { filterByPrice } = productsSlice.actions

export default productsSlice.reducer