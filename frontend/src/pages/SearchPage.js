import React, { useEffect } from "react";
import { useActions } from "../customhooks/useActions";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Product, LoadingBox, MessageBox, Rating } from "../components";
import { prices, ratings } from "../utils";

const SearchPage = (props) => {
  console.log("object");
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order="newest"
  } = useParams();

  const { getProductList } = useActions();
  const productsInfo = useSelector((state) => state.productList);

  const { loading, error, products } = productsInfo;

  const categoryInfo = useSelector((state) => state.categoryList);

  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoryInfo;

  useEffect(() => {
    getProductList({
      name: name !== "all" ? name : "",
      category: category !== "all" ? category : "",
      min,
      max,
      rating,
      order
    });
  }, [name, category, min, max, rating,order]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;

    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };

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
        <div>
          Sort by {" "}
          <select 
          onChange={e=>{props.history.push(getFilterUrl({order:e.target.value}))}}
          value={order} >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price Low to High</option>
            <option value="highest">Price: High to low</option>
            <option value="toprated">Avg. Customer Reviewes</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>

          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                <Link
                      className={"all" === category ? "active" : ""}
                      to={getFilterUrl({ category: "all" })}
                    >
                      Any
                    </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? "active" : ""}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={ `${r.rating}`  ===  `${rating}` ? "active" : ""}
                  >
                    <Rating caption={' & up'} rating={r.rating} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
