import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/app";

export const fetchBooks = createAsyncThunk(
    'books/createAsyncThunk',
    async () => {
        const books = await firebase.firestore().collection('book').get()
        return books.docs.map((i) => ({ ...i.data(), id: i.id }))
    }
)

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        isLoadingBooks: false,
        items: [],
        errorBooks: undefined
    },
    extraReducers: {
        [fetchBooks.pending]: (state) => ({ ...state, isLoadingBooks: true, errorBooks: undefined }),
        [fetchBooks.fulfilled]: (state, { payload }) => ({ ...state, isLoadingBooks: false, items: payload }),
        [fetchBooks.rejected]: (state, { error }) => ({
            ...state,
            isLoadingBooks: false,
            errorBooks: error,
        })
    }
})

export const booksReducer = booksSlice.reducer;