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
  const [showForm, setShowForm] = useState<boolean>(true); // Define showForm as a boolean
  const [editMode, setEditMode] = useState<string | null>(null); // Define editMode as string or null
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
      setShippingInfo({
        name: "",
        address: "",
        phoneNumber: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
      });
      setShowForm(true); 
      getAddress();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const editAddress = (id: string) => { // Define id as string
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
    <div className="shipping">
      {/* <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button> */}
      {/* <h1 style={{marginLeft:'3rem'}}>Shipping Address</h1> */}
      <div className="bg-blue">
      <div className=" row rowBlock">
      <div className="col-6 w100">
        <div className="ship-content ship-l">
        <h4 style={{color:"#fff"}}>Saved Address</h4>
  {addresses.length > 0 && (
    <div>
      {addresses.map((address, index) => (
        <div key={index} className="address-box">
          {editMode !== address._id ? (
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
              <div>
              <button onClick={() => editAddress(address._id)} className="address-edit"><FaRegEdit/></button>
          <button onClick={() => deleteAddress(address._id)} className="address-delete"><MdDelete /></button>
              </div>
            </div>
          ) : (
            <div className="edit-box">
              <div>Name : <input
                required
                type="text"
                placeholder="Name"
                name="name"
                value={shippingInfo.name}
                onChange={changeHandler}
              /></div>
              <div>Phone Number :<input
              required
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={shippingInfo.phoneNumber}
              onChange={(e) => {const value = e.target.value;
if (/^\d{0,10}$/.test(value)) {setShippingInfo((prev) => ({ ...prev, phoneNumber: value }));}}}
      /></div>
              <div>Address : <input
                required
                type="text"
                placeholder="Address"
                name="address"
                value={shippingInfo.address}
                onChange={changeHandler}
              /></div>
              <div>City : <input
                required
                type="text"
                placeholder="City"
                name="city"
                value={shippingInfo.city}
                onChange={changeHandler}
              /></div>
              <div>State : <input
                required
                type="text"
                placeholder="State"
                name="state"
                value={shippingInfo.state}
                onChange={changeHandler}
              /></div>
              <div>Pin Code : <input
                required
                type="number"
                placeholder="Pin Code"
                name="pinCode"
                value={shippingInfo.pinCode}
                onChange={changeHandler}/></div>
              <select
                name="country"
                required
                value={shippingInfo.country}
                onChange={changeHandler}
              >
                <option value="">Choose Country</option>
                <option value="india">India</option>
              </select>
              <div className="edit-confirm">
                <button onClick={() => saveEditedAddress()} className="button save">Save</button>
                <button onClick={() => cancelEdit()} className="button cancel">Cancel</button>
              </div>
              
            </div>
          )}
          {/* <button onClick={() => editAddress(address._id)} className="address-edit"><FaRegEdit/></button>
          <button onClick={() => deleteAddress(address._id)} className="address-delete"><MdDelete /></button> */}
        </div>
      ))}
    </div>
  )}
        </div>

</div>

        <div className="col-6 w100">
          <div className="ship-content ship-r">
          <div className="radio-container">
    <h4>Add New Address</h4>
  </div>
  {showForm && (
    <div className="new-address">
      <form onSubmit={addAddress}>
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
        <div className="input-box-address">
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            value={shippingInfo.city}
            onChange={changeHandler}
          />
        </div>
        <div className="input-box-address">
          <input
            required
            type="text"
            placeholder="State"
            name="state"
            value={shippingInfo.state}
            onChange={changeHandler}
          />
        </div>
        <div className="input-box-address">
          <select
            name="country"
            required
            value={shippingInfo.country}
            onChange={changeHandler}
          >
            <option value="">Choose Country</option>
            <option value="india">India</option>
          </select>
        </div>
        <div className="input-box-address">
          <input
            required
            type="number"
            placeholder="Pin Code"
            name="pinCode"
            value={shippingInfo.pinCode}
            onChange={changeHandler}
          />
        </div>
        <button type="submit" className="checkout res-fs">Add New Address</button>
      </form>
    </div>
  )}
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
