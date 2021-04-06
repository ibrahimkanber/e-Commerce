import React, { useEffect } from "react";
import { useActions } from "../customhooks/useActions";
import { useSelector } from "react-redux";
import { LoadingBox, MessageBox, Rating,Product } from "../components";
const SellerPage = (props) => {
  const { getUserDetail, getProductList } = useActions();
  const sellerId = props.match.params.id;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const productsInfo = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productsInfo;

  useEffect(() => {
    getUserDetail(sellerId);
    getProductList({ seller: sellerId });
  }, [sellerId]);
  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <img
                    className="small"
                    src={user.seller.logo}
                    alt={user.seller.name}
                  />
                </div>
                <div className="p-1">
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.seller.rating}
                numReviews={`${user.seller.numReviews}  reviews`}
              ></Rating>
            </li>
            <li>
              <a href={`mailto: ${user.email} `}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingProducts ? (
          <LoadingBox></LoadingBox>
        ) : errorProducts ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Products</MessageBox>}
            <div className="row center">
              {products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { SellerPage };
