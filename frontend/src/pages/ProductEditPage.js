import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { LoadingBox, MessageBox } from "../components";
import { useActions } from "../customhooks/useActions";
import { useSelector, useDispatch } from "react-redux";
import { PRODUCT_UPDATE_RESET } from "../state/action-types";
import axios from "axios";

const ProductEditPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInSTock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const { getProductDetails, updateProduct } = useActions();

  const updatedProductInfo = useSelector((state) => state.updateProduct);

  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = updatedProductInfo;

  const productdata = useSelector((state) => state.productDetails);
  const { product, error, loading } = productdata;

  const authSignIn=useSelector(state=>state.authSignIn)
  const {userInfo}=authSignIn

  const [loadingUpLoad, setLoadingUpload] = useState(false);
  const [errorUpload,setErrorUpload]=useState("")

  const uploadFileHandler = async(e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);

    try {
      const {data}=await axios.post("/api/uploads",bodyFormData,{
       headers:{
         "Content-Type":"multipart/form-data",
         Authorization:`Bearer ${userInfo.token}`
        
        },
      })

      setImage(data)
      setLoadingUpload(false)


    } catch (error) {
      setErrorUpload(error.message)
      setLoadingUpload(false)
    }


  };
  console.log(updatedProductInfo);
  useEffect(() => {
    if (successUpdate) {
      console.log("calisti");
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/productlist");
    }
    if (!product || product?._id !== id || successUpdate) {
      getProductDetails(id);
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInSTock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [id, product?._id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct({
      _id: id,
      name,
      price,
      image,
      countInStock,
      category,
      brand,
      description,
    });
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{error}</MessageBox>}
        {loading && <LoadingBox></LoadingBox>}
        {error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Upload image"
              />
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                id="imageFile"
                type="file"
              
                onChange={uploadFileHandler}
                placeholder="Upload image"
                label="Choose Image"
              />
              {loadingUpLoad && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
              />
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter brand"
              />
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                value={countInStock}
                onChange={(e) => setCountInSTock(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                rows="3"
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export { ProductEditPage };
