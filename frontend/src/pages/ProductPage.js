import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Rating } from "../components";
import { useSelector } from "react-redux";
import { useActions } from "../customhooks/useActions";
import { LoadingBox, MessageBox } from "../components";

const ProductPage = () => {
  const history = useHistory();
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const { getProductDetails } = useActions();
  const productdata = useSelector((state) => state.productDetails);

  const { product, error, loading } = productdata;

  console.log(error);

  const handleSelect = (e) => {
    //console.log(e.target.value)
    setQty(e.target.value);
  };

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  useEffect(() => {
    getProductDetails(id);
  }, []);

  if (!product) {
    return <div>Product Not found</div>;
  }

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>Price : ${product.price}</li>
                <li>
                  Description :<p>${product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>Seller <h2> <Link to={`/seller/${product?.seller?._id}`}>{product?.seller?.seller?.name}</Link>  </h2>
                  <Rating 
                  rating={product?.seller?.seller?.rating}
                  numReviews={product?.seller?.seller?.numReviews}
                  
                  />
                    </li>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select onChange={handleSelect} value={qty}>
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          className="primary block"
                          onClick={addToCartHandler}
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { ProductPage };
