import React, {useEffect } from "react";
import { Product,MessageBox,LoadingBox } from "../components";
import {Carousel} from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useActions } from "../customhooks/useActions";
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"

const HomePage = () => {
  
  const {products,loading,error}=useSelector(state=>state.productList)

  const userTopSellerList=useSelector(state=>state.userTopSellersList)

  const {loading:loadingSeller,error:errorSeller,users:sellers}=userTopSellerList
  
  const {getProductList,getTopSellers}=useActions()

  
  useEffect(() => {
    getProductList({});
    getTopSellers()
  }, []);

  return (
    <div>
      <h2>Top Sellers</h2>
      {loadingSeller ? (
        <LoadingBox></LoadingBox>
      ) : errorSeller ? (
        <MessageBox variant="danger">{errorSeller}</MessageBox>
      ) : (
        <>
        {sellers.length===0 && <MessageBox>No Seller Found</MessageBox>}
        <Carousel showArrows autoPlay showThumbs={false}>
          {
              sellers.map(seller=>(
                <div key={seller._id}>
                  <Link to={`/seller/${seller._id}`}>

                    <img src={seller.seller.logo} alt={seller.seller.name}/>
                    <p className="legend">{seller.seller.name}</p>
                  </Link>
                </div>
              ))
          }
        </Carousel>
        </>
        
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
       { products?.length===0 && <MessageBox>No Product Found</MessageBox>}
        <div className="row center">
          {products.map((product) => (
           
            <Product product={product} key={product._id} />
          ))}
        </div>
        </>
      )}
    </div>
  );
};

export { HomePage };
