import React, { useEffect } from "react";
import { useActions } from "../customhooks/useActions";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux"
import { Product,LoadingBox,MessageBox} from "../components";
const SearchPage = (props) => {
  const { name = "all" } = useParams();
  const { getProductList } = useActions();
  const productsInfo = useSelector((state) => state.productList);

  const { loading, error, products } = productsInfo;
  useEffect(() => {
    getProductList({ name: name !== "all" ? name : "" });
  }, [name]);

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <ul>
            <li>Category1</li>
          </ul>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products?.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { SearchPage };
