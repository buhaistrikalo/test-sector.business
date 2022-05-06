import axios from "axios";
import { IPost } from "models/IPost"
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPost = createAsyncThunk(
    'posts/fetchAll',
    async (_, thinkAPI) => {
        try {
            const response = await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
            return response.data
        } catch (e) {
            return thinkAPI.rejectWithValue("Не удалось загрузить")
        }
    }
)