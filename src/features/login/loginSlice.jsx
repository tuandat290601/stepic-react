import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    form: "signin",
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setForm: (state, action) => {
            state.form = action.payload
        },
    }
})

export const { setCurrentUser, setForm } = loginSlice.actions
export default loginSlice.reducer;