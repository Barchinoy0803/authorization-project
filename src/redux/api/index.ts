import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
    reducerPath: "mainApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://keldibekov.online",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token") || ""
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["AUTH"]
})