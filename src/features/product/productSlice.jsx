import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
    filteredProductList: [],
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductList: (state, action) => {
            state.productList = action.payload
        },
        setFilteredProduct: (state, action) => {
            state.filteredProductList = action.payload
        }
    }
})

export const { setProductList, setFilteredProduct } = productSlice.actions
export default productSlice.reducer;