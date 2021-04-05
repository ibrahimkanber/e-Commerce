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
    }
  }, [getUserDetail, userInfo._id, user]);

  //console.log(user);
  const submitHandler = (e) => {
    e.preventDefault();
    updateUserProfile({userId:user._id,name,email,password})
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
