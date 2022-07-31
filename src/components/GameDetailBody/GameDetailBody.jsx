import React from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import "./GameDetailBody.sass";

const GameDetailBody = () => {
  const { singleProduct } = useSelector((store) => store.product);
  const { description } = singleProduct;
  console.log(singleProduct)
  return <div className="detail-body">

    {parse(description)}

  </div>;
};

export default GameDetailBody;
