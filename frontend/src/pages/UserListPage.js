import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {LoadingBox,MessageBox} from "../components"
import {useActions} from "../customhooks/useActions"
const UserListPage=()=> {

    const {getUserList}=useActions()
    const userListInfo=useSelector(state=>state.userList)
    const {users,error,loading}=userListInfo
    
    useEffect(()=>{
        getUserList()
    },[])

    return (
        <div>
            <h1></h1>
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
                                           <button className="" type="button">Edit</button>
                                           <button className="" type="button">Delete</button>
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
