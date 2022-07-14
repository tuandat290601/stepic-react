import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: "home",
    searchKey: ""
}

const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setSearchKey: (state, action) => {
            state.searchKey = action.payload
        }
    }
})

export const { setCurrentPage, setSearchKey } = navbarSlice.actions
export default navbarSlice.reducer;