import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {LoadingBox,MessageBox} from "../components"
import {useActions} from "../customhooks/useActions"
import {useHistory} from "react-router-dom"
import { USER_DETAIL_RESET } from "../state/action-types";
const UserListPage=()=> {
    const dispatch=useDispatch()
    const history=useHistory()
    const {getUserList,deleteUser}=useActions()
    const userListInfo=useSelector(state=>state.userList)
    const {users,error,loading}=userListInfo
    
    const deletedUserInfo=useSelector(state=>state.userDelete)
    const {success:successDelete,error:errorDelete,loading:loadingDelete}=deletedUserInfo


    useEffect(()=>{
        getUserList()
        
        dispatch({type:USER_DETAIL_RESET})
    },[successDelete])

    const deleteHandler=(id)=>{
        if(window.confirm("Are you sure ")){
            deleteUser(id)
        }

    }

    const editHandler=(id)=>{
        history.push(`/user/${id}/edit`)
    }

    return (
        <div>
            <h1>Users</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User deleted successfully</MessageBox>}
            {
                loading? 
                (<LoadingBox></LoadingBox>)
                :
                error?
                (<MessageBox variant="danger">{error}</MessageBox>)
                :
                (
                   <table className="table">
                       <thead>
                           <tr>
                               <th>ID</th>
                               <th>NAME</th>
                               <th>EMAIL</th>
                               <th>IS SELLER</th>
                               <th>IS ADMIN</th>
                               <th>ACTIONS</th>
                           </tr>
                       </thead>
                       <tbody>
                           {
                               users?.map(user=>(
                                   <tr key={user._id}>
                                       <td>{user._id}</td>
                                       <td>{user.name}</td>
                                       <td>{user.email}</td>
                                       <td>{user.isSeller? "YES":"NO"}</td>
                                       <td>{user.isAdmin? "YES":"NO"}</td>
                                       <td>
                                           <button className="small" type="button" onClick={()=>editHandler(user._id)}>Edit</button>
                                           <button className="small" type="button" onClick={()=>deleteHandler(user._id)}>Delete</button>
                                       </td>
                                  
                                   </tr>
                               ))
                           }
                       </tbody>
                   </table> 
                )
            }
            
        </div>
    )
}

export  {UserListPage}
