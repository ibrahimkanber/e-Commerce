import React, {useEffect } from "react";
import { Product,MessageBox,LoadingBox } from "../components";

import { useActions } from "../customhooks/useActions";
import {useSelector} from "react-redux"

const HomePage = () => {
  
  const {products,loading,error}=useSelector(state=>state.productList)
  
  const {getProductList}=useActions()

  
  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
           
            <Product product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export { HomePage };
