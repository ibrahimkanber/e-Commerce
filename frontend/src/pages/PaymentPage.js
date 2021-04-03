import React, { useState } from 'react';
import {CheckoutSteps} from "../components";
import {useHistory} from "react-router-dom";
import {useActions} from "../customhooks/useActions"
import {useSelector} from "react-redux"

const PaymentPage=()=> {

    const shippingStatus=useSelector(state=>state.cart.shippingAddress)
    const history=useHistory()

    if(!shippingStatus.address){
        history.push("/shipping")
    }

    const [paymentMethod,setPaymentMethod]=useState("Paypal")
    const {savePaymentMethod} =useActions()
    const submitHandler=(e)=>{
        console.log("helllo")
        e.preventDefault();
        savePaymentMethod(paymentMethod)
        history.push("/placeorder")
        
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment</h1>
                </div>
                <div>
                    <div>
                        <input 
                        type="radio" 
                        id="paypal"
                        value="Paypal"
                        name="paymentMethod"
                        required
                        checked={paymentMethod==="Paypal"}
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="paypal">Paypal</label>
                        
                    </div>
                </div>
                <div>
                    <div>
                        <input 
                        type="radio" 
                        id="stripe"
                        value="Stripe"
                        name="paymentMethod"
                        required
                        checked={paymentMethod==="Stripe"}
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
            <div>
                <button className="primary" type="submit">
                    Continue
                </button>
            </div>
            </form>
            
        </div>
    )
}

export  {PaymentPage}
