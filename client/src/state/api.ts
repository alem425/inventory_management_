// Import necessary functions from Redux Toolkit's RTK Query package
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product{
   productId: string;
   name: string;
   price: number;
   rating?: number;
   stockQuantity: number;
}
export interface NewProduct{
   name: string;
   price: number;
   rating?:number;
   stockQuantity: number;
}
export interface SalesSummary{
   salesSummaryId: string;
   totalValue: number;
   changePercentage?: number;
   date: string;
}

export interface PurchaseSummary{
   purchaseSummaryId:string;
   totalPurchased:number;
   changePercentage?:number;
   date:string;
}

export interface ExpenseSummary{
   expensSummaryId:string;
   totalExpenses:number;
   date: string;
}

export interface ExpenseByCategorySummary{
   expenseByCategoryId:string;
   expenseSummaryId: string;
   category:string; 
   date: string;
   amount:number;
}

export interface DashboardMetrics{
   popularProducts: Product[];
   salesSummary: SalesSummary[];
   purchaseSummary: PurchaseSummary[];
   expenseSummary: ExpenseSummary[];
   expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User{
   userId: string;
   name: string;
   email: string;
}
// Create an API slice using the `createApi` function
export const api = createApi({
   // The base query specifies how to make requests
   // `fetchBaseQuery` is a simple built-in utility for making HTTP requests
   // Here, the `baseUrl` is being set from an environment variable.
   baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),

   // `reducerPath` defines the key in the Redux store where this API's state will be kept
   // In this case, it's named "api".
   reducerPath: "api",

   // `tagTypes` is used for caching and invalidating data. 
   // You can define specific tags here to group and manage your cached data.
   // This is left empty for now, meaning no tags are set up.
   tagTypes: ["DashboardMetrics", "Products", "Users","Expenses"],

   // Define the API endpoints here.
   // The `endpoints` function is where you specify the operations (e.g., GET, POST, etc.)
   // that your API can perform. It's currently empty because no endpoints are defined yet.
   endpoints: (build) => ({
      getDashboardMetrics: build.query<DashboardMetrics, void>({
         query: () => "/dashboard",
         providesTags: ["DashboardMetrics"]
      }),

      getProducts: build.query<Product[], string | void>({
         query: (search) => ({
            url:"/products",
            params: search ? { search } : {}
         }),
         providesTags: ["Products"],
      }),

      createProduct: build.mutation<Product, NewProduct>({
         query: (newProduct) => ({
            url:"/products",
            method: "POST",
            body: newProduct
         }),
         invalidatesTags: ["Products"], 
      }),

      getUsers: build.query<User[],void>({
         query: () => "/users",
         providesTags: ["Users"],
      }),

      getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({

         query: () => "/expenses",
         providesTags: ["Expenses"],
      }),
   }),

});

// Export the API's endpoints for use elsewhere in the application.
// In this case, no endpoints are defined, so nothing is exported here yet.
export const {
   useGetDashboardMetricsQuery,
   useGetProductsQuery,
   useCreateProductMutation,
   useGetUsersQuery,
   useGetExpensesByCategoryQuery,
} = api;
