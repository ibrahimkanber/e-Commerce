import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useActions } from "../customhooks/useActions";
import { LoadingBox, MessageBox } from "../components/";
import { USER_UPDATE_RESET } from "../state/action-types";

const ProfilePage = () => {
  const dispatch=useDispatch()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");

  const updatedProfile=useSelector(state=>state.updateUserProfile)
  const {success:successUpdate,error:errorUpdate,loading:loadingUpdate}=updatedProfile

  const userProfile = useSelector((state) => state.authSignIn);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const { userInfo } = userProfile;
  const { getUserDetail,updateUserProfile } = useActions();

  useEffect(() => {
    if (!user) {
      dispatch({type:USER_UPDATE_RESET})
      getUserDetail(userInfo._id);
    }else{
        setName(user.name)
        setEmail(user.email)
        setPassword(user.password)
        if(user.seller){
          setSellerName(user.seller.name)
          setSellerLogo(user.seller.logo)
          setSellerDescription(user.seller.description)
        }
    }
  }, [getUserDetail, userInfo._id, user]);

  console.log(user)
  //console.log(user);
  const submitHandler = (e) => {
    e.preventDefault();
    updateUserProfile({userId:user._id,name,email,password,sellerName,sellerLogo,sellerDescription})
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
          {successUpdate && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
            <div>
              <label htmlFor="name">Name</label>
              <input
                on
                id="name"
                type="text"
                value={name}
                placeholder="Enter name"
                onChange={e=>setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={e=>setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
          
                placeholder="Enter password"
                onChange={e=>setPassword(e.target.value)}
              ></input>
            </div>
            {user.isSeller && (
              <>
              <h2>Seller</h2>
              <div>
                <label htmlFor="sellerName">Seller Name</label>
                <input
                placeholder="Enter Seller Name"
                onChange={e=>setSellerName(e.target.value)}
                id="sellerName"
                type="text"
                value={sellerName}
                />
              </div>
              <div>
                <label htmlFor="sellerLogo">Seller Logo</label>
                <input
                placeholder="Enter Seller Logo"
                onChange={e=>setSellerLogo(e.target.value)}
                id="sellerLogo"
                type="text"
                value={sellerLogo}
                />
              </div>
              <div>
                <label htmlFor="sellerDescription">Seller Description</label>
                <input
                placeholder="Enter Seller Description"
                onChange={e=>setSellerDescription(e.target.value)}
                id="sellerDescription"
                type="text"
                value={sellerDescription}
                />
              </div>
              </>
            )}
            <div>
              <label />
              <button className="primary" type="button" onClick={submitHandler}>
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export { ProfilePage };
