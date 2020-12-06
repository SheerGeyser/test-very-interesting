import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/app";

export const fetchBooks = createAsyncThunk(
    'books/createAsyncThunk',
    async () => {
        const books = await firebase.firestore().collection('book').get()
        return books.docs.map((i) => ({ ...i.data(), id: i.id }))
    }
)

export const createBook = createAsyncThunk(
    'books/createBook',
    async ({ bookAuthor, bookIsbn, bookName, imgUrl, bookYear }) => {
        const book = await firebase.firestore().collection('book').add({
            authors: `${bookAuthor}`,
            isbn: `${bookIsbn}`,
            name: `${bookName}`,
            src: `${imgUrl}`,
            year: parseInt(bookYear),
        })
        return { bookAuthor, bookIsbn, bookName, imgUrl, bookYear }
    }
)

export const delleteBook = createAsyncThunk(
    'delete/delleteBook',
    async (id) => {
        const delBook = await firebase.firestore().collection('book').doc(id).delete()
        return delBook
    }
)

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        isLoadingBooks: false,
        items: [],
        errorBooks: undefined,
        reload: false
    },
    extraReducers: {
        [fetchBooks.pending]: (state) => ({ ...state, isLoadingBooks: true, errorBooks: undefined }),
        [fetchBooks.fulfilled]: (state, { payload }) => ({ ...state, isLoadingBooks: false, items: payload }),
        [fetchBooks.rejected]: (state, { error }) => ({
            ...state,
            isLoadingBooks: false,
            errorBooks: error,
        }),
        [createBook.pending]: (state) => ({
            ...state,
            reload: false
        }),
        [createBook.fulfilled]: (state, { payload }) => ({
            ...state,
            items: [...state.items, payload],
            reload: true
        }),
        [delleteBook.pending]: (state) => ({
            ...state,
            reload: false
        }),
        [delleteBook.fulfilled]: (state) => ({
            ...state,
            reload: true
        })
    }
})

export const booksReducer = booksSlice.reducer;