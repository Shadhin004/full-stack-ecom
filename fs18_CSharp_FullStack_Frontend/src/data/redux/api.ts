
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import { CartItemUpdateDto } from "../types/cart";
import { CreateProducDto, UpdateProducDto } from "../types/product";


export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}`,
        prepareHeaders: (headers) => {
            const accessToken = localStorage.getItem('authToken')

            headers.set('Authorization', `Bearer ${accessToken}`);
            return headers;
        },
        credentials: "include",
    }),

    reducerPath: "api",
    tagTypes: [
        "Cities",
        "Products",
        "Category",
        "Carts",
        "Orders",
        "Users"
    ],
    endpoints: (build) => ({
        //City
        getCities: build.query({
            query: () => ({
                url: `Citys`,
                method: "GET",
            }),
            providesTags: ["Cities"],
        }),
        //Product
        getProductDetails: build.query({
            query: (id: string | undefined) => ({
                url: `v1/Products/${id}`,
                method: "GET",
            }),
            providesTags: ["Products"],
        }),
        getProducts: build.query({
            query: (queryString: string | null) => ({
                url: `v1/Products?${queryString}`,
                method: "GET"
            })
        }),
        createProducts: build.mutation<any, CreateProducDto >({
            query: (productCreateDto) => ({
                url: `/v1/Products`,
                method: 'POST',
                body: productCreateDto,
            })
        }),
        updateProducts: build.mutation<any, UpdateProducDto >({
            query: (productCreateDto) => ({
                url: `/v1/Products/${productCreateDto.productId}`,
                method: 'PATCH',
                body: productCreateDto,
            })
        }),
        deleteProducts: build.mutation<any, string >({
            query: (productId) => ({
                url: `/v1/Products/${productId}`,
                method: 'DELETE'
            })
        }),
        //Category
        getCategories: build.query({
            query: () => ({
                url: `v1/Categories`,
                method: "GET",
            }),
            providesTags: ["Category"],
        }),
        //Cart
        addCartItem: build.mutation<any, {cartItem: any }>({
            query: ({ cartItem }) => ({
                url: `/v1/CartItems`,
                method: 'POST',
                body: cartItem,
            })
        }),
        removeCartItem: build.mutation<string, string>({
            query: (cartItemId) => ({
                url: `/v1/CartItems/${cartItemId}`,
                method: 'DELETE'
            }),
        }),
        getCartDetails: build.query({
            query: () => ({
                url: `v1/Carts`,
                method: "GET",
            }),
            providesTags: ["Carts"],
        }),
        updateCartItem: build.mutation<string, string>({
            query: (cartItemUpdateDto) => ({
                url: `/v1/CartItems?${cartItemUpdateDto}`,
                method: 'PATCH'
            }),
        }),
        //Order
        createOrder: build.mutation({
            query: () => ({
                url: `/v1/Order`,
                method: 'POST',
                body: ''
            }),
        }),
        getAllOrders: build.query({
            query: () => ({
                url: `v1/Order`,
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),
        getAllOrdersForAdmin: build.query({
            query: () => ({
                url: `v1/Order/admin`,
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),
        updateOrderStatus: build.mutation<string, {orderId : string, orderStatus : string}>({
            query: ({orderId, orderStatus}) => ({
                url: `/v1/Order/${orderId}/admin?orderStatus=${orderStatus}`,
                method: 'PATCH'
            }),
        }),
        //User
        updateUser: build.mutation<void, {updateData :string, userId : string}>({
            query: ({updateData, userId}) => ({
                url: `/v1/Users/${userId}?${updateData}`,
                method: 'PATCH',
                // body: updateData
            }),
        }),
        getAllUsersForAdmin: build.query({
            query: (queryString: string | null) => ({
                url: `v1/Users?${queryString}`,
                method: "GET"
            })
        }),
        updateUserStatus: build.mutation<string, string>({
            query: (updateData) => ({
                url: `/v1/Users/profileStatus?${updateData}`,
                method: 'PATCH'
            }),
        }),
    })
});
export const {
    useGetCitiesQuery,
    useGetProductDetailsQuery,
    useGetCategoriesQuery,
    useGetProductsQuery,
    useAddCartItemMutation,
    useGetCartDetailsQuery,
    useRemoveCartItemMutation,
    useCreateOrderMutation,
    useGetAllOrdersQuery,
    useUpdateCartItemMutation,
    useUpdateUserMutation,
    useCreateProductsMutation,
    useUpdateProductsMutation,
    useDeleteProductsMutation,
    useGetAllOrdersForAdminQuery,
    useUpdateOrderStatusMutation,
    useGetAllUsersForAdminQuery,
    useUpdateUserStatusMutation
} = api;