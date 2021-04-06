import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingBox, MessageBox } from "../components";
import { useActions } from "../customhooks/useActions";
import { useHistory } from "react-router-dom";
import {
  PRODUCT_CRETATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../state/action-types";

const ProductListPage = (props) => {
  const sellerMode=props.match.path.indexOf("/seller")>=0
  const dispatch = useDispatch();
  const productsInfo = useSelector((state) => state.productList);
  const authSignIn = useSelector((state) => state.authSignIn);
  const {userInfo}=authSignIn;

  const deletedProduct = useSelector((state) => state.deleteProduct);

  const createdProductInfo = useSelector((state) => state.createProduct);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deletedProduct;

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = createdProductInfo;

  const { loading, error, products } = productsInfo;
  const { getProductList, createProduct, deleteProduct } = useActions();
  const history = useHistory();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CRETATE_RESET });
      history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    getProductList({seller: sellerMode? userInfo._id:""});
  }, [createdProduct?._id, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete")) {
      deleteProduct(product._id);
    }
  };

  const createHandler = () => {
    createProduct();
  };

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>ACTIONS</th>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => history.push(`/product/${product._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export { ProductListPage };
