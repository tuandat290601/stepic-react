import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
    filteredProductList: [],
    sort: "name-increase",
    singleProduct: null,
    cartProduct: [],
    filter: {
        price: null
    },
    // homeCategory: {
    //     navitem: "",
    //     displayList: []
    // }
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
        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload
        },
        sortProduct: (state, action) => {
            const sort = action.payload
            state.sort = sort
            if (sort === "name-increase") {
                state.filteredProductList = state.filteredProductList.sort((gameA, gameB) => {
                    const nameA = gameA.name.toLowerCase();
                    const nameB = gameB.name.toLowerCase();
                    if (nameA > nameB) return 1
                    if (nameA < nameB) return -1
                    else return 0
                })
            }
            if (sort === "name-decrease") {
                state.filteredProductList = state.filteredProductList.sort((gameA, gameB) => {
                    const nameA = gameA.name.toLowerCase();
                    const nameB = gameB.name.toLowerCase();
                    if (nameA > nameB) return -1
                    if (nameA < nameB) return 1
                    else return 0
                })
            }
            if (sort === "price-increase") {
                state.filteredProductList = state.filteredProductList.sort((gameA, gameB) => {
                    return gameA.price - gameB.price
                })
            }
            if (sort === "price-decrease") {
                state.filteredProductList = state.filteredProductList.sort((gameA, gameB) => {
                    return gameB.price - gameA.price
                })
            }
            if (sort === "Top Discount") {
                state.filteredProductList = state.filteredProductList.sort((gameA, gameB) => {
                    return gameB.discount - gameA.discount
                })
            }
            if (sort === "Highest Rating") {
                state.filteredProductList = state.filteredProductList.sort((gameA, gameB) => {
                    return gameB.rating - gameA.rating
                })
            }
        },
        getCartProduct: (state) => {
            const cart = JSON.parse(localStorage.getItem("cart"))
            if (cart) {
                state.cartProduct = [...cart]
            }
            else {
                localStorage.setItem("cart", JSON.stringify(state.cartProduct))
            }
        },
        setCartProduct: (state) => {
            localStorage.setItem("cart", JSON.stringify(state.cartProduct))
        },
        addToCart: (state, action) => {
            state.cartProduct = [...state.cartProduct, action.payload]
        },
        removeFromCart: (state, action) => {
            const newCart = [...state.cartProduct].filter((product) => {
                return product.id !== action.payload
            })
            state.cartProduct = newCart
        },
        clearCart: (state) => {
            state.cartProduct = []
        },
        setFilter: (state, action) => {
            state.filter = { ...action.payload }
        }
    }
})

export const { setProductList, setFilteredProduct, sortProduct, setSingleProduct, getCartProduct, setCartProduct, addToCart,
    removeFromCart, clearCart, setFilter } = productSlice.actions
export default productSlice.reducer;