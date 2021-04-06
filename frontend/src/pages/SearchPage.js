import React, { useEffect } from "react";
import { useActions } from "../customhooks/useActions";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Product, LoadingBox, MessageBox } from "../components";
const SearchPage = (props) => {

  const { name = "all",category="all" } = useParams();

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
    getProductList({ name: name !== "all" ? name : "",category: category !== "all" ? category : "" });
  }, [name,category]);


  const getFilterUrl=(filter)=>{
      const filterCategory=filter.category || category
      const filterName=filter.name || name

      return `/search/category/${filterCategory}/name/${filterName}`
  }

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

          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            <ul>
             {categories.map(c=>(
               <li key={c}>
                 <Link 
                 className={c===category? "active":""}
                 to={getFilterUrl({category:c})}
                 
                 >{c}</Link>
               </li>
             ))}
            </ul>
          )}
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
