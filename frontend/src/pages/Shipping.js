import React,{useState} from 'react'
import { CheckoutSteps } from '../components'
import {useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import {useActions} from "../customhooks/useActions"
const Shipping=()=> {
    const history=useHistory()

    const userInfo=useSelector(state=>state.authSignIn.userInfo)
    //console.log(userInfo)
    const shippingAddress=useSelector(state=>state.cart.shippingAddress)
    
    if(!userInfo){
        history.push("/signin")
    }
    const {saveShippingAdress}=useActions()
    const [fullName, setFullName] = useState(shippingAddress?.fullName)
    const [address, setAddress] = useState(shippingAddress?.address)
    const [city, setCity] = useState(shippingAddress?.city)
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode)
    const [country, setCountry] = useState(shippingAddress?.country)
    

    const submitHandler=(e)=>{
        e.preventDefault();
        saveShippingAdress({fullName,address,city,postalCode,country})
        history.push("/payment")
        
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Adress</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input 
                    type="text"
                    id="fullName" 
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={e=>setFullName(e.target.value)}
                    required/>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input 
                    type="text"
                    id="address" 
                    placeholder="Enter address"
                    value={address}
                    onChange={e=>setAddress(e.target.value)}
                    required/>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input 
                    type="text"
                    id="city" 
                    placeholder="Enter city"
                    value={city}
                    onChange={e=>setCity(e.target.value)}
                    required/>
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input 
                    type="number"
                    id="postalCode" 
                    placeholder="Enter postalCode"
                    value={postalCode}
                    onChange={e=>setPostalCode(e.target.value)}
                    required/>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input 
                    type="text"
                    id="country" 
                    placeholder="Enter country"
                    value={country}
                    onChange={e=>setCountry(e.target.value)}
                    required/>
                </div>
                <div>
                    <label/>
                    <button 
                    className="primary"
                    type="submit"

                    >Continue</button>
                </div>
            </form>
        </div>
    )
}

export  {Shipping}
