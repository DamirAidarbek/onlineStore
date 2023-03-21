import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../../utills/constants'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProduct: build.query({
      query: ({ id }) => `/products/${id}`,
      providesTags: ['Product']
    }),
    searchProduct: build.query({
      query:({title, id, price_min, price_max}) => {
        const params = {}
        if (title) params.title = title
        if (id) params.categoryId = id
        if (price_min) params.price_min = price_min
        if (price_max) params.price_max = price_max
        console.log('price_max' + price_max, 'price_min' + price_min)
        return {
          url: 'products/',
          params: params,
          providesTags: (result, error, arg) =>
            result
              ? [...result.map(({ id }) => ({ type: 'Post', id })), 'Post']
              : ['Post'],
        }
      }
    })
  })
})

export const { useGetProductQuery, useSearchProductQuery } = apiSlice