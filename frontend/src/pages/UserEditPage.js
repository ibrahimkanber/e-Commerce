import React, { useEffect, useState } from "react";
import { LoadingBox, MessageBox } from "../components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useActions } from "../customhooks/useActions";
import { USER_UPDATE_FROM_ADMIN_RESET } from "../state/action-types";



const UserEditPage = () => {
  const history=useHistory()
  const dispatch=useDispatch()
  const { id } = useParams();
  console.log(id)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { getUserDetail,updateUserFromAdmin } = useActions();


  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const updatedProfile=useSelector(state=>state.userUpdate)
  const {success:successUpdate,error:errorUpdate,loading:loadingUpdate}=updatedProfile
  
  const submitHandler = (e) => {
    e.preventDefault();
    updateUserFromAdmin({_id:id,name,email,isSeller,isAdmin})
  };

  useEffect(() => {
  if(successUpdate){
    dispatch({type:USER_UPDATE_FROM_ADMIN_RESET})
      history.push("/userlist")
    } 
    if (!user || (user?._id !==id)) {
      getUserDetail(id);
    }else{
      setName(user.name)
      setEmail(user.email)
      setIsSeller(user.isSeller)
      setIsAdmin(user.isAdmin)
    }
  }, [user?._id,successUpdate,id]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
          {successUpdate && <MessageBox variant="success">User Updated Successfully</MessageBox>}
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="isSeller">is Seller</label>
              <input
                id="isSeller"
                type="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="isAdmin">Is Admin</label>
              <input
                id="isAdmin"
                type="text"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <div>
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export { UserEditPage };
