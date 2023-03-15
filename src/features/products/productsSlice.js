import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../utills/constants";
import { shuffle } from "../../utills/common";

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
        related: [],
        isLoading: false
    },
    reducers: {
        filterByPrice: (state, action) => {
            state.filtered = state.list.filter(({ price }) => price < action.payload)
        },
        getRelatedProducts: (state, { payload }) => {
            const list = state.list.filter(({ category: { id } }) => id === payload.category.id)

            state.related = shuffle(list)
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

export const { filterByPrice, getRelatedProducts } = productsSlice.actions

export default productsSlice.reducer