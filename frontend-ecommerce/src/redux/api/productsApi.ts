import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoriesResponse, ProductsResponse, SearchProductResponse,SearchProductRequest, NewProductRequest, MessageResponse, ProductResponse, UpdateProductRequest, DeleteProductRequest } from "../../types/api-types";


export const latestProductApi = createApi({
  reducerPath: "latestProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl:'http://localhost:4000/api/v1/product/',
    }),
  tagTypes:['product'],
  endpoints: (builder) => ({
    latestProducts:builder.query<ProductsResponse,string>({query:()=>'latest',providesTags:['product']}),

    allProducts :builder.query<ProductsResponse,string>({query:(id)=>`admin-products?id=${id}`,providesTags:['product']}),

    categories :builder.query<CategoriesResponse,string>({query:()=>'categories',providesTags:['product']}),

    searchProducts :builder.query<SearchProductResponse,SearchProductRequest >({query:({price,search,sort,category,page})=>{
      let base=`all?search=${search}&page=${page}`
      if(price) base+= `&price=${price}`
      if(sort) base+= `&sort=${sort}`
      if(category) base+= `&category=${category}`
      return base
    },providesTags:['product']}),

    productDetails:builder.query<ProductResponse,string>({query:(id)=>id,providesTags:['product']}),

    newProduct:builder.mutation<MessageResponse,NewProductRequest>({query:({name, price, stock, category,discription,photo,id})=>({
      url:`new?id=${id}`,
      method:'POST',
      body:{name, price, stock, category,discription,photo}
    }),invalidatesTags:['product']}),

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


export const { useLatestProductsQuery,useAllProductsQuery, useCategoriesQuery,useSearchProductsQuery,useNewProductMutation,useProductDetailsQuery,useUpdateProductMutation,useDeleteProductMutation} = latestProductApi;
