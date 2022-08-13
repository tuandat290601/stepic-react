import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredProduct,
  setSingleProduct,
  setCartProduct,
  addToCart,
  sortProduct,
} from "../../features/product/productSlice";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { formatDate } from "../../ultils/formatDate";
import { formatPrice } from "../../ultils/formatPriceToUSD"
import { BsArrowRight, BsCart, BsCartCheck, BsDownload } from "react-icons/bs";
import "./HomeCategory.sass";

const HomeCategory = () => {
  const navList = ["Top Discount", "New Release", "Highest Rating"];
  const [discountList, setDiscountList] = useState([]);
  const [newreleaseList, setNewreleaseList] = useState([]);
  const [highrateList, setHighrateList] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  const { productList, cartProduct } = useSelector((store) => store.product);
  const { currentUser } = useSelector(store => store.login)
  const dispatch = useDispatch();

  const [category, setCategory] = useState("Top Discount");

  const getDiscountList = () => {
    let newList = [...productList];
    return newList.sort((productA, productB) => {
      return productB.discount - productA.discount;
    });
  };

  const getHighRating = () => {
    let newList = [...productList];
    return newList.sort((productA, productB) => {
      return productB.rating - productA.rating;
    });
  };

  const getNewRelease = () => {
    let currentDate = formatDate(
      new Date().toISOString().slice(0, 10)
    ).replaceAll("/", "");
    let newList = [...productList];
    return newList
      .filter((product) => {
        const { publishDate } = product;
        let date = formatDate(publishDate).replaceAll("/", "");
        return date <= currentDate;
      })
      .sort((productA, productB) => {
        return new Date(productB.publishDate) - new Date(productA.publishDate);
      });
  };


  useEffect(() => {
    setDiscountList(getDiscountList());
    setNewreleaseList(getNewRelease());
    setHighrateList(getHighRating());
    setDisplayList(discountList)
  }, [productList]);

  useEffect(() => {
    setDiscountList(getDiscountList());
    setDisplayList(discountList)
  }, []);

  const handleCategoryList = () => {
    if (category === "Top Discount") {
      setDisplayList(discountList.slice(0, 7));
      dispatch(setFilteredProduct(discountList));
    } else if (category === "New Release") {
      setDisplayList(newreleaseList.slice(0, 7));
      dispatch(setFilteredProduct(newreleaseList));
    } else {
      setDisplayList(highrateList.slice(0, 7));
      dispatch(setFilteredProduct(highrateList));
    }
  };

  const checkBoughtProduct = (id) => {
    let bought = false
    if (currentUser !== null) {
      currentUser.ownedGame.forEach(game => {
        if (game.id === id) {
          bought = true
          return bought
        }
      })
    }
    return bought
  }

  useEffect(() => {
    handleCategoryList();
  }, [category, productList]);
  console.log(category)
  return (
    <section id="home-category">
      <div className="home-category-navbar">
        <ul className="home-category-navlist">
          {navList.map((navitem, index) => {
            return (
              <li
                key={index}
                className={
                  navitem === category
                    ? "home-category-navitem active"
                    : "home-category-navitem"
                }
                onClick={() => {
                  setCategory(navitem)
                }}
              >
                {navitem}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="home-category-list-container container">
        <ul className="home-category-list row">
          {displayList.map((item, index) => {
            const { id, gameImage, name, price, discount } = item;
            const added = cartProduct.filter(game => game.id === item.id)
            return (
              <div
                key={index}
                className="home-category-item col-12 col-s-6 col-md-4 col-lg-3"
              >
                <div className="img-container">
                  <img src={gameImage} alt={name} className="game-image" />
                  <div className="blur-container">
                    <div className="info-container">
                      <div className="info-container-left">
                        <Link to={`/game/${id}`} className="info-name" onClick={() => dispatch(setSingleProduct({ ...item }))}>{name}</Link>
                        <div className="info-price-container">
                          {discount !== 0 && (
                            <p className="info-discount">
                              ${formatPrice(price)}
                              <BsArrowRight />
                            </p>
                          )}
                          {price !== 0 ? <p className="info-price">
                            ${formatPrice(price - price * (discount / 100))}
                          </p> : <p className="info-price">
                            Free
                          </p>}
                        </div>
                      </div>
                      <div className="info-container-right">
                        {checkBoughtProduct(id) === true ? <button className="add-to-cart-btn disabled" >
                          <BsDownload />
                        </button> : <>
                          {added.length !== 0 ?
                            <button className="add-to-cart-btn disabled" >
                              <BsCartCheck />
                            </button>
                            :
                            <button className="add-to-cart-btn" onClick={() => {
                              dispatch(addToCart(item))
                              dispatch(setCartProduct())
                            }
                            }><BsCart /></button>
                          }
                        </>}

                      </div>
                    </div>
                  </div>
                  {discount === 0 ? null : <div className="discount-tag">-{discount}%</div>}
                </div>

              </div>
            );
          })}
          {displayList.length !== 0 && (
            <Link to="/game" className="home-category-item col-12 col-s-6 col-md-4 col-lg-3" onClick={() => dispatch(sortProduct(category))}>
              <div className="img-container">
                <img src={discountList[8].gameImage} className="game-image" />
                <div className="blur-container">
                  See more <HiOutlineArrowNarrowRight />
                </div>
              </div>
              <div className="info-container">
                <p className="game-name"></p>
              </div>
            </Link>
          )}
        </ul>
      </div>
    </section>
  );
};

export default HomeCategory;
