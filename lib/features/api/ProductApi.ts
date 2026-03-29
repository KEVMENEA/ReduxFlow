import { ProductResponse } from "@/lib/type/product-type";
import { fakeStoreApi } from "./api";

export const productApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse[], void>({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.map((product) => ({
                type: "products" as const,
                id: product.id,
              })),
              { type: "products" as const, id: "LIST" },
            ]
          : [{ type: "products" as const, id: "LIST" }],
    }),

    addProduct: builder.mutation<ProductResponse, Partial<ProductResponse>>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "products", id: "LIST" }],
    }),

    getProductById: builder.query<ProductResponse, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "products", id }],
    }),

    updateProduct: builder.mutation<
      ProductResponse,
      { id: number; body: Partial<ProductResponse> }
    >({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "products", id },
        { type: "products", id: "LIST" },
      ],
    }),

    deleteProduct: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "products", id },
        { type: "products", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;