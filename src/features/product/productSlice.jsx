import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
    filteredProductList: [],
    sort: "name-increase"
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
        },
        sortProduct: (state, action) => {
            const sort = action.payload
            state.sort = sort
            if(sort === "name-increase"){
                state.filteredProductList = state.filteredProductList.sort((gameA, gameB)=>{
                    const nameA = gameA.name.toLowerCase();
                    const nameB = gameB.name.toLowerCase();
                    if(nameA>nameB) return 1
                    if(nameA<nameB) return -1
                    else return 0
                })
            }
            if(sort === "name-decrease"){
                state.filteredProductList = state.filteredProductList.sort((gameA, gameB)=>{
                    const nameA = gameA.name.toLowerCase();
                    const nameB = gameB.name.toLowerCase();
                    if(nameA>nameB) return -1
                    if(nameA<nameB) return 1
                    else return 0
                })
            }
            if(sort === "price-increase"){
                state.filteredProductList = state.filteredProductList.sort((gameA, gameB)=>{
                    return gameA.price - gameB.price
                })
            }
            if(sort === "price-decrease"){
                state.filteredProductList = state.filteredProductList.sort((gameA, gameB)=>{
                    return gameB.price - gameA.price
                })
            }
            console.log(state.filteredProductList)
        }
    }
})

export const { setProductList, setFilteredProduct, sortProduct } = productSlice.actions
export default productSlice.reducer;