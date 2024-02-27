import { RootState } from "../../redux/store";
import './pay.css'
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
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const [newOrder] = useNewOrderMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    setIsProcessing(true);
  
    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      paymentMethod,
      user: user?._id!,
    };
  
    console.log("Order Data:", orderData);
  
    if (paymentMethod === 'CARD') {
      if (!stripe || !elements) return setIsProcessing(false);
  
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: { 
          return_url: window.location.origin,
        },
        redirect: "if_required",
      });
  
      if (error) {
        setIsProcessing(false);
        console.log(error);
        return toast.error(error.message || "Something Went Wrong");
      }
  
      if (paymentIntent.status === "succeeded") {
        const res = await newOrder(orderData);
        console.log('Stripe payment done');
        dispatch(resetCart());
        responseToast(res, navigate, "/profile/myOrders");
      }
    } else if (paymentMethod === 'CASH') {
      // Handle payment without Stripe confirmation
      const res = await newOrder(orderData);
      console.log('Order placed with cash payment');
      dispatch(resetCart());
      responseToast(res, navigate, "/profile/myOrders");
    }
  
    setIsProcessing(false);
  };
  
  
  return (
    <div className="center" style={{minHeight:'90vh'}}>
      <div className="checkout-container">
        <form onSubmit={submitHandler}>
          <h3 className="mt-4 text-center">MAKE PAYMENT</h3>
          <h5 className="mt-3">Please Select Payment Method First.</h5>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          required className="payselect">
            <option value="">Select Payment Method</option>
            <option value="CARD">Credit Card</option>
            <option value="CASH">Cash On Delivery</option>
          </select>
          {paymentMethod === 'CASH' ? <>
          <button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay"}
          </button>
          </>:<>
          <PaymentElement />
          <button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay"}
          </button>
          </>}
          
        </form>
      </div>
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
