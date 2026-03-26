import { ProductResponse } from "@/lib/type/product-type";
import { fakeStoreApi } from "./api";
import { createApi } from "@reduxjs/toolkit/query";


export const productApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse[], void>({
      query: () => "/products",
      providesTags: ['products'],
    }),

    // getProductById: builder.query<ProductResponse, number>({
    //   query: (id) => `/products/${id}`,
    // }),

    addProduct: builder.mutation<ProductResponse, Partial<ProductResponse>>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ['products'],
    }),
    updateProduct: builder.mutation<ProductResponse, { id: number; body: Partial<ProductResponse>}> ({
        query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "products",
        { type: "products", id },
      ],
    }),
     deleteProduct: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        "products",
        { type: "products", id },
      ],
    }),
  }),
});


export const { useGetProductsQuery, 
  useAddProductMutation ,
  useUpdateProductMutation,
  useDeleteProductMutation, } = productApi;