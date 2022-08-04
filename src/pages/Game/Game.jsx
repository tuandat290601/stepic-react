import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Sort, Filter, GameList } from "../../components";
import { setProductList, setFilteredProduct, getCartProduct } from "../../features/product/productSlice";
import API from "../../common/API/API";


import "./Game.sass";

const Game = () => {
  const dispatch = useDispatch()
  const { productList, filteredProductList } = useSelector((store) => store.product);
  const { searchKey } = useSelector((store) => store.navbar);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    if (productList.length === 0) {
      let res = await API.get("/product")
      dispatch(setProductList(res.data))
      dispatch(setFilteredProduct(res.data))
    }
  }
  useEffect(() => {
    dispatch(getCartProduct())
    getProducts()
  }, [])

  useEffect(() => {
    if (filteredProductList.length !== 0) {
      setLoading(false);
    }
  }, [filteredProductList]);

  return (
    <>
      {loading ? (
        <div id="game-page">
          <div className="game-page-container">
            <p>No result found</p>
          </div>
        </div>
      ) : (
        <div id="game-page">
          <div className="game-page-container">
            <div className="game-page-header">
              <div className="result-notice">Results for: {searchKey}</div>
              <Sort />
            </div>
            <hr />
            <div className="game-page-body">
              <GameList />
              <Filter />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
