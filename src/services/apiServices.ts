import * as ApiService from "./apiHandler.ts"
import {ApiObject, FilterObject, SignInObject, SignUpObject} from "../interfaces/api.ts";
import {Address, Order} from "../interfaces/user.ts";

export const signupService = async (obj: SignUpObject) => {
    const apiObject: ApiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = false
    apiObject.endpoint = `users/signup`
    apiObject.body = obj
    return await ApiService.callApi(apiObject);
}

export const signinService = async (obj: SignInObject) => {
    const apiObject: ApiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = false
    apiObject.endpoint = `users/signIn`
    apiObject.body = obj
    return await ApiService.callApi(apiObject);
}

export const userDetailsService = async () => {
    const apiObject: ApiObject = {}
    apiObject.method = "GET"
    apiObject.authentication = true
    apiObject.endpoint = `users/userDetails`
    return await ApiService.callApi(apiObject);
}

export const productsService = async (currentPage: number, obj: FilterObject) => {
    const apiObject: ApiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = false
    apiObject.endpoint = `products?page=${currentPage}`
    apiObject.body = obj
    return await ApiService.callApi(apiObject);
}

export const productDetailsService = async (productId: string | undefined) => {
    const apiObject: ApiObject = {}
    apiObject.method = "GET"
    apiObject.authentication = false
    apiObject.endpoint = `products/${productId}`
    return await ApiService.callApi(apiObject);
}

export const trendingService = async () => {
    const apiObject: ApiObject = {}
    apiObject.method = "GET"
    apiObject.authentication = false
    apiObject.endpoint = `products/trending`
    return await ApiService.callApi(apiObject);
}

export const searchProductService = async (searchTerm: string) => {
    const apiObject: ApiObject = {}
    apiObject.method = "GET"
    apiObject.authentication = false
    apiObject.endpoint = `products/search?searchTerm=${searchTerm}`
    return await ApiService.callApi(apiObject);
}

export const addCartItemService = async (productId: string) => {
    const apiObject: ApiObject = {}
    apiObject.method = "PATCH"
    apiObject.authentication = true
    apiObject.endpoint = `users/cart/${productId}`
    return await ApiService.callApi(apiObject);
}

export const deleteCartItemService = async (productId: string) => {
    const apiObject: ApiObject = {}
    apiObject.method = "DELETE"
    apiObject.authentication = true
    apiObject.endpoint = `users/cart/${productId}`
    return await ApiService.callApi(apiObject);
}

export const addWishlistItemService = async (productId: string) => {
    const apiObject: ApiObject = {}
    apiObject.method = "PATCH"
    apiObject.authentication = true
    apiObject.endpoint = `users/wishlist/${productId}`
    return await ApiService.callApi(apiObject);
}

export const deleteWishlistItemService = async (productId: string) => {
    const apiObject: ApiObject = {}
    apiObject.method = "DELETE"
    apiObject.authentication = true
    apiObject.endpoint = `users/wishlist/${productId}`
    return await ApiService.callApi(apiObject);
}

export const getUserAddressesService = async () => {
    const apiObject: ApiObject = {}
    apiObject.method = "GET"
    apiObject.authentication = true
    apiObject.endpoint = `users/addresses`
    return await ApiService.callApi(apiObject);
}

export const saveNewUserAddressService = async (obj: Address) => {
    const apiObject: ApiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = true
    apiObject.endpoint = `users/addresses`
    apiObject.body = obj
    return await ApiService.callApi(apiObject);
}

export const initializeNewOrderService = async (obj: Order) => {
    const apiObject: ApiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = true
    apiObject.endpoint = `orders/init`
    apiObject.body = obj
    return await ApiService.callApi(apiObject);
}

export const completeOrderPaymentService = async (obj: Order) => {
    const apiObject: ApiObject = {}
    apiObject.method = "PATCH"
    apiObject.authentication = true
    apiObject.endpoint = `orders/complete`
    apiObject.body = obj
    return await ApiService.callApi(apiObject);
}

export const getUserOrderService = async (currentPage: number) => {
    const apiObject: ApiObject = {}
    apiObject.method = "GET"
    apiObject.authentication = true
    apiObject.endpoint = `orders?page=${currentPage}&limit=5`
    return await ApiService.callApi(apiObject);
}

export const getUserOrderDetailsService = async (orderId: string) => {
    const apiObject: ApiObject = {}
    apiObject.method = "GET"
    apiObject.authentication = true
    apiObject.endpoint = `orders/${orderId}`
    return await ApiService.callApi(apiObject);
}

