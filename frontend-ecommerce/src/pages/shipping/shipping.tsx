import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../../redux/cart-reducer";
import { server } from "../../redux/store";
import { RootState } from "../../redux/store";
import { UserReducerInitialState } from "../../types/reducerTypes";

const Shipping = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(null); 
  const { cartItems, total } = useSelector((state: RootState) => state.cartReducer);
  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async () => {
    try {
      if (!selectedAddress) {
        toast.error("Please select an address first");
        return;
      }
      
      const { data } = await axios.post(
        `${server}/api/v1/payments/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      dispatch(saveShippingInfo(selectedAddress));
      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  

  const getAddress = async () => {
    try {
      const addressData = await axios.get(
        `${server}/api/v1/address/all-address/${user?._id}`
      );
      setAddresses(addressData.data.getAllAdress);
    } catch (error) {
      console.log(error);
    }
  };


  const deleteAddress = async (_id) => {
    try {
      const addressData = await axios.delete(
        `${server}/api/v1/address/${_id}`
      );
      getAddress();
    } catch (error) {
      console.log(error);
    }
  };
  const cancelEdit = () => {
    setEditMode(null);
    setShippingInfo({
      name: "",
      address: "",
      phoneNumber: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    });
  };
  const addAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${server}/api/v1/address/new`, {
        user: user?._id,
        name: shippingInfo.name,
        phoneNumber: shippingInfo.phoneNumber,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        country: shippingInfo.country,
        pinCode: shippingInfo.pinCode,
      });
      setShippingInfo({
        name: "",
        address: "",
        phoneNumber: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
      });
      setShowForm(false); 
      getAddress()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const editAddress = (id) => {
    setEditMode(id);
    const editedAddress = addresses.find((address) => address._id === id);
    if (editedAddress) {
      setShippingInfo({
        name: editedAddress.name,
        address: editedAddress.address,
        phoneNumber: editedAddress.phoneNumber,
        city: editedAddress.city,
        state: editedAddress.state,
        country: editedAddress.country,
        pinCode: editedAddress.pinCode,
      });
    }
  };

  const saveEditedAddress = async () => {
    try {
      await axios.put(`${server}/api/v1/address/${editMode}`, {
        name: shippingInfo.name,
        phoneNumber: shippingInfo.phoneNumber,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        country: shippingInfo.country,
        pinCode: shippingInfo.pinCode,
      });
      setEditMode(null);
      setShippingInfo({
        name: "",
        address: "",
        phoneNumber: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
      });
      getAddress();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  return (
    <div >
            <h1>Shipping Address</h1>
      <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>



      <div>
        <input
          type="radio"
          id="savedAddress"
          name="addressType"
          value="savedAddress"
          checked={!showForm}
          onChange={() => setShowForm(false)}
        />
        <label htmlFor="savedAddress">Use Saved Address</label>

        {addresses.length > 0 && (
          <div>
            <h2>Saved Addresses</h2>
            {addresses.map((address, index) => (
              <div key={index}>
                {editMode !== address._id ? (
                  <>
                    <input
                      type="radio"
                      id={`address${index}`}
                      name="selectedAddress"
                      value={address._id}
                      checked={selectedAddress === address._id}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      disabled={showForm}
                    />
                    <label htmlFor={`address${index}`}>
                      <div>
                        <strong>Name:</strong> {address.name} <br />
                        <strong>Address:</strong> {address.address} <br />
                        <strong>Phone Number:</strong> {address.phoneNumber} <br />
                        <strong>City:</strong> {address.city} <br />
                        <strong>State:</strong> {address.state} <br />
                        <strong>Country:</strong> {address.country} <br />
                        <strong>Pin Code:</strong> {address.pinCode} <br />
                      </div>
                    </label>
                    <button onClick={() => editAddress(address._id)}>Edit</button>
                    <button onClick={() => deleteAddress(address._id)}>Delete</button>

                  </>
                ) : (
                  <>
                    <input
              required
              type="text"
              placeholder="Name"
              name="name"
              value={shippingInfo.name}
              onChange={changeHandler}
            />
            <input
              required
              type="number"
              placeholder="Phone Number"
              name="phoneNumber"
              value={shippingInfo.phoneNumber}
              onChange={changeHandler}
            />
            <input
              required
              type="text"
              placeholder="Address"
              name="address"
              value={shippingInfo.address}
              onChange={changeHandler}
            />
            <input
              required
              type="text"
              placeholder="City"
              name="city"
              value={shippingInfo.city}
              onChange={changeHandler}
            />
            <input
              required
              type="text"
              placeholder="State"
              name="state"
              value={shippingInfo.state}
              onChange={changeHandler}
            />
            <select
              name="country"
              required
              value={shippingInfo.country}
              onChange={changeHandler}
            >
              <option value="">Choose Country</option>
              <option value="india">India</option>
            </select>
            <input
              required
              type="number"
              placeholder="Pin Code"
              name="pinCode"
              value={shippingInfo.pinCode}
              onChange={changeHandler}/>
                    <button onClick={() => saveEditedAddress()}>Save</button>
                    <button onClick={() => cancelEdit()}>Cancel</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        <div>
          <input
            type="radio"
            id="newAddress"
            name="addressType"
            value="newAddress"
            checked={showForm}
            onChange={() => setShowForm(true)}
          />
          <label htmlFor="newAddress">Add New Address</label>

          {showForm && (
            <form onSubmit={addAddress}>
<input
              required
              type="text"
              placeholder="Name"
              name="name"
              value={shippingInfo.name}
              onChange={changeHandler}
            />
            <input
              required
              type="number"
              placeholder="Phone Number"
              name="phoneNumber"
              value={shippingInfo.phoneNumber}
              onChange={changeHandler}
            />
            <input
              required
              type="text"
              placeholder="Address"
              name="address"
              value={shippingInfo.address}
              onChange={changeHandler}
            />
            <input
              required
              type="text"
              placeholder="City"
              name="city"
              value={shippingInfo.city}
              onChange={changeHandler}
            />
            <input
              required
              type="text"
              placeholder="State"
              name="state"
              value={shippingInfo.state}
              onChange={changeHandler}
            />
            <select
              name="country"
              required
              value={shippingInfo.country}
              onChange={changeHandler}
            >
              <option value="">Choose Country</option>
              <option value="india">India</option>
            </select>
            <input
              required
              type="number"
              placeholder="Pin Code"
              name="pinCode"
              value={shippingInfo.pinCode}
              onChange={changeHandler}/>
              <button type="submit">Add New Address</button>
            </form>
          )}
        </div>
      </div>

      <button onClick={submitHandler}>Pay Now</button>
    </div>
  );
};

export default Shipping;
