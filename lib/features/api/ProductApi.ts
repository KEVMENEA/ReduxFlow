import { ProductResponse } from "@/lib/type/product-type";
import { fakeStoreApi } from "./api";
import { createApi } from "@reduxjs/toolkit/query";


export const productApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse[], void>({
      query: () => "/products",
      providesTags: ['products'],
    }),

    getProductById: builder.query<ProductResponse, number>({
      query: (id) => `/products/${id}`,
    }),

    addProduct: builder.mutation<ProductResponse, Partial<ProductResponse>>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ['products'],
    }),
  }),
});


export const { useGetProductsQuery, useGetProductByIdQuery, useAddProductMutation } = productApi;