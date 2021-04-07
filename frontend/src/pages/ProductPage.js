import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Rating } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useActions } from "../customhooks/useActions";
import { LoadingBox, MessageBox } from "../components";
import { PRODUCT_REVIEW_RESET } from "../state/action-types";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState();
  const history = useHistory();
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const { getProductDetails,createReview } = useActions();
  const productdata = useSelector((state) => state.productDetails);
  const { product, error, loading } = productdata;
  const userProfile = useSelector((state) => state.authSignIn);
  const { userInfo } = userProfile;
  const productReviewInfo = useSelector((state) => state.createProductReview);
  const {
   
    error: errorReview,
    loading: loadingReview,
    success: successReview,
  } = productReviewInfo;

  console.log(error);

  const handleSelect = (e) => {
    //console.log(e.target.value)
    setQty(e.target.value);
  };

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  useEffect(() => {
    if (successReview) {
      window.alert("Review submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }
    getProductDetails(id);
  }, [successReview, id]);

  if (!product) {
    return <div>Product Not found</div>;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      createReview(id, { rating,comment, name: userInfo.name });
    }
  };

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
                  <li>
                    Seller{" "}
                    <h2>
                      {" "}
                      <Link to={`/seller/${product?.seller?._id}`}>
                        {product?.seller?.seller?.name}
                      </Link>{" "}
                    </h2>
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
          <div>
            <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((r) => (
                <li key={r._id}>
                  <strong>{r.name}</strong>
                  <Rating rating={r.rating} caption=" " />
                  <p>{r.createdAt.substring(0, 10)}</p>
                  <p>{r.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        value={rating}
                        id="rating"
                        onChange={(e) => setRating(e.target.value)}
                        defaultValue="1"
                      >
                        <option value="1">1-Poor</option>
                        <option value="2">2-Fair</option>
                        <option value="3">3-Good</option>
                        <option value="4">4-Very good</option>
                        <option value="5">5-Excellent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        rows="10"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button type="submit" className="primary">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReview && <LoadingBox></LoadingBox>}
                      {errorReview && (
                        <MessageBox variant="danger">{errorReview}</MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export { ProductPage };
