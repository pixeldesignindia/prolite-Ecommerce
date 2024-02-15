import { RootState } from "@reduxjs/toolkit/query";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../../redux/api/orderApi";
import { resetCart } from "../../redux/cart-reducer";
import { NewOrderRequest } from "../../types/api-types";
import { responseToast } from "../../utils/features";

const stripePromise=loadStripe("pk_test_51Ocj2lSHAtpPWpJpsqojSFQBhZbv6jqH4I2eQhwv1Z6WC97G5JYn1jnaGDlnAyiAeadc9AZVvammzphazxidEK1A00hjF8mK6J");

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [newOrder] = useNewOrderMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!stripe || !elements) return;
    setIsProcessing(true);
  
    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      paymentMethod:'CARD',
      user: user?._id!,
    };
  
    console.log("Order Data:", orderData); // Log the orderData object
  
    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { 
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });
  
    if (error) {
      setIsProcessing(false);
      console.log(error)
      return toast.error(error.message || "Something Went Wrong");
    }
  
    if (paymentIntent.status === "succeeded") {
      const res = await newOrder(orderData);
      console.log('stwipe done')
      dispatch(resetCart());
      responseToast(res, navigate, "/profile/myOrders");
    }
    setIsProcessing(false);
  };
  
  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();

  const clientSecret: string | undefined = location.state;
console.log(clientSecret);

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default Checkout;
