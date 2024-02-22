import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoriesResponse, ProductsResponse, SearchProductResponse,SearchProductRequest, NewProductRequest, MessageResponse, ProductResponse, UpdateProductRequest, DeleteProductRequest } from "../../types/api-types";


export const latestProductApi = createApi({
  reducerPath: "latestProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl:`${process.env.VITE_API_URL}api/v1/product/`,
    }),
  tagTypes:['product'],
  endpoints: (builder) => ({
    latestProducts:builder.query<ProductsResponse,string>({query:()=>'latest',providesTags:['product']}),
    latestProductsByBrand:builder.query<ProductsResponse,string>({query:()=>'latestByBrand',providesTags:['product']}),

    allProducts :builder.query<ProductsResponse,string>({query:(id)=>`admin-products?id=${id}`,providesTags:['product']}),

    categories :builder.query<CategoriesResponse,string>({query:()=>'categories',providesTags:['product']}),
    categoryOfBrand :builder.query<CategoriesResponse,string>({query:()=>'categoryByBrand',providesTags:['product']}),
    searchProducts :builder.query<SearchProductResponse,SearchProductRequest >({query:({price,search,sort,category,page,brand})=>{
      let base=`all?search=${search}&page=${page}`
      if(price) base+= `&price=${price}`
      if(sort) base+= `&sort=${sort}`
      if(category) base+= `&category=${category}`
      if(brand) base+= `&brand=${brand}`
      return base
    },providesTags:['product']}),

    productDetails:builder.query<ProductResponse,string>({query:(id)=>id,providesTags:['product']}),

    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: 'POST',
        body: formData, 
      }),
      invalidatesTags: ['product']
    }),

    updateProduct:builder.mutation<MessageResponse,UpdateProductRequest>({query:({formData,userId,productId})=>({
      url:`${productId}?id=${userId}`,
      method:'PUT',
      body:formData
    }),invalidatesTags:['product']}),
    deleteProduct:builder.mutation<MessageResponse,DeleteProductRequest>({query:({userId,productId})=>({
      url:`${productId}?id=${userId}`,
      method:'DELETE',
    }),invalidatesTags:['product']}),
  }),
});


export const { useLatestProductsQuery,useAllProductsQuery, useCategoriesQuery,useSearchProductsQuery,useNewProductMutation,useProductDetailsQuery,useUpdateProductMutation,useDeleteProductMutation,useLatestProductsByBrandQuery ,useCategoryOfBrandQuery} = latestProductApi;
