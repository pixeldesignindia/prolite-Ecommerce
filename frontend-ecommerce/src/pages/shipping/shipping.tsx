import  { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../../redux/cart-reducer";
import { server } from "../../redux/store";
import { RootState } from "../../redux/store";
import { UserReducerInitialState } from "../../types/reducerTypes";
import './shipping.css';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Footer from "../../components/footer/Footer";

const Shipping = () => {
  const [addresses, setAddresses] = useState<any[]>([]); // Define addresses as an array of any type
  const [selectedAddress, setSelectedAddress] = useState<any | null>(null); // Define selectedAddress as string or null
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

  const deleteAddress = async (_id: string) => { // Define _id as string
    try {
      await axios.delete(
        `${server}/api/v1/address/${_id}`
      );
      getAddress();
    } catch (error) {
      console.log(error);
    }
  };

  const editAddress = (id: string) => { 
    setSelectedAddress(id);
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

  useEffect(() => {
    getAddress();
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  const addOrUpdateAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedAddress) {
        // Update address
        await axios.put(`${server}/api/v1/address/${selectedAddress}`, {
          name: shippingInfo.name,
          phoneNumber: shippingInfo.phoneNumber,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          country: shippingInfo.country,
          pinCode: shippingInfo.pinCode,
        });
      } else {
        // Add new address
        await axios.post(`${server}/api/v1/address/new`, {
          user: user?._id,
          name: shippingInfo.name,
          phoneNumber: shippingInfo.phoneNumber,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          country: shippingInfo.country,
          pinCode: shippingInfo.pinCode,
        });
      }

      // Clear form fields and refresh addresses
      setShippingInfo({
        name: "",
        address: "",
        phoneNumber: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
      });
      setSelectedAddress(null);
      getAddress();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="shipping">
      <div className="bg-blue">
        <div className="row rowBlock">
          <div className="col-6 w100">
            <div className="ship-content">
              <h4 style={{color:"#000"}}>Saved Address</h4>
              {addresses.length > 0 && (
                <div className="mt-3">
                  {addresses.map((address, index) => (
                    <div key={index} className="address-box">
                      <div onClick={() => setSelectedAddress(address._id)} className={`radio-label redio-address ${selectedAddress === address._id ? 'selectedAddressLabel' : ''}`}>
                        <div className="user-address">
                          <p className="user-add-row"><strong>Name :</strong> <span>{address.name}</span>  </p>
                          <p className="user-add-row"><strong>Address : </strong> <span> {address.address}</span>  </p>
                          <p className="user-add-row"><strong>Phone :</strong> <span>{address.phoneNumber} </span>  </p>
                          <p className="user-add-row"><strong>City :</strong> <span>{address.city} </span>  </p>
                          <p className="user-add-row"><strong>State :  </strong> <span>{address.state}</span>  </p>
                          <p className="user-add-row"><strong>Country :   </strong> <span>{address.country} </span>  </p>
                          <p className="user-add-row"><strong>Pin Code :</strong> <span>{address.pinCode}</span>  </p>
                        </div>
                        <div className="ed-btn">
                          <button onClick={() => editAddress(address._id)} className="address-edit">Edit</button>
                          <button onClick={() => deleteAddress(address._id)} className="address-delete">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-6 w100">
            <div className="ship-content ship-r">
              <div className="radio-container">
                <h4> { selectedAddress ? 'Edit Address':'Add New Address'}</h4>
              </div>
              <div className="new-address">
                <form onSubmit={addOrUpdateAddress}>
                  <div className="input-box-address">
                    <input
                      required
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={shippingInfo.name}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="input-box-address">
                    <input
                      required
                      type="text"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={shippingInfo.phoneNumber}
                      onChange={(e) => {const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {setShippingInfo((prev) => ({ ...prev, phoneNumber: value }));}}}
                    />
                  </div>
                  <div className="input-box-address">
                    <input
                      required
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="input-box-address sm-address">
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
                  </div>
                  <div className="input-box-address sm-address">
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
                      onChange={changeHandler}
                    />
                  </div>
                  <button type="submit" className="checkout res-fs"> { selectedAddress ? 'Save Address':'Add New Address'} </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="center"> <button className="checkout pay-now  mb-5 mt-2" onClick={submitHandler}>Pay Now</button></div>
      </div>
      <Footer />
    </div>
  );
};

export default Shipping;
