import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";
import {ApiObject, ApiResponse} from "../interfaces/api.ts";
import $ from 'jquery'

export const callApi = async (apiObject: ApiObject): Promise<ApiResponse> => {

    if (apiObject.loading === undefined) $(".loadingEffect").css("display", "block");

    let result: ApiResponse;
    const method = apiObject.method?.toLowerCase() ?? "get";

    const headers = new AxiosHeaders({
        "Content-Type": apiObject.urlEncoded
            ? "application/x-www-form-urlencoded"
            : apiObject.multipart
                ? "multipart/form-data"
                : "application/json",
    });

    // If authentication is required, add token
    if (apiObject.authentication) {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
    }

    const url = `${import.meta.env.VITE_SERVER_URL}/${import.meta.env.VITE_BASE_PATH}/${apiObject.endpoint}`;

    try {
        const config: AxiosRequestConfig = {
            method,
            url,
            headers,
            data: method !== "get" && method !== "delete" ? apiObject.body : undefined,
        };

        const response: AxiosResponse<ApiResponse> = await axios(config);

        $(".loadingEffect").css("display", "none");
        result = response.data;

    } catch (error) {
        $(".loadingEffect").css("display", "none");

        if (axios.isAxiosError(error) && error.response) {
            result = {success: false, statusCode: error.response.data?.statusCode,  message: error.response.data?.message};
        } else {
            result = {success: false, message: "Your connection was interrupted" };
        }

        // if (axios.isAxiosError(error) && error.response) {
        //     if (error.response.status === 705 || error.response.status === 605) {
        //         if (apiObject.state === "login") {
        //             return { success: false, message: error.response.data?.message || "Login error" };
        //         }
        //     } else if (error.response.status === 401) {
        //         if (apiObject.state === "login") {
        //             return { success: false, message: "Invalid login details, please try again!" };
        //         }
        //         if (apiObject.state === "renewToken") {
        //             return { success: false, message: "Your session has expired. Please sign in again ..." };
        //         }
        //     } else {
        //         result = { success: false, message: error.response.data?.message || "An error occurred" };
        //     }
        // } else {
        //     result = { success: false, message: "Your connection was interrupted" };
        // }
        //
        // if (!result.success && apiObject.toast === undefined) {
        //     showToast({ type: "error", message: result.message || "An error occurred" });
        // }
    }

    return result;
};
