import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { IPost } from "models/IPost"


export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], any>({
            query: () => ({
                url: '/posts'
            }),
            providesTags: result => ['Post']
        }),
    })
})