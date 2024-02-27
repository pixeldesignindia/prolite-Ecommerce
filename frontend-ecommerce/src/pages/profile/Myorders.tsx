import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducerTypes";
import "./profile.css";
import Accordion from "react-bootstrap/Accordion";
import ProfileSide from "../../components/sideNavProfile/ProfileSide";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import { server } from "../../redux/store";
import { useNavigate } from "react-router-dom";
const Myorders = () => {
    const navigate = useNavigate()
    const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );
    const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);
    console.log(isLoading, data, isError, error);

    return (
    <div className="profile-page bg-blue">
    <ProfileSide name={user?.name as string} pic={user?.photo as string} />
        <div className="profileLeft center">
        <div className="profileBody orderBody">
            <div className="profile-data">
            <h3 className="text-center">My Orders</h3>
            <div className="profile-myorder">
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                {data &&
                    data?.orders.map((order:any, i) => (
                        <Accordion.Item eventKey={i.toString()} key={i}>
                        <Accordion.Header><div className="row " style={{width:'100%'}}>
                            <div className="col-5 text-center none">{order._id}</div> 
                            <div className="col-2 text-center date">{new Date(order.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })}</div> 
                            
                            <div className="col-2 text-center">&#x20b9;{order.total}</div> 
                            <div className="col-1 text-center">X{order.orderItems.length}</div> 
                            
    <div className={
                order.status === "Processing"? "col-2 text-center red": order.status === "Shipped"? "col-2 green text-center": "col-2 purple text-center"}>{order.status}</div> 
                            </div></Accordion.Header>
                        <Accordion.Body>
                        <div className="row rowBlock">
                            <div className="col-6 w100">
                            <h4 style={{marginBottom:"1.2rem"}}>Order Info</h4>
                            <p className="orderId fs">Order Id : {order._id}</p>
                            <button onClick={() => navigate(`/order/${order._id}`)} className="log mb-2 mt-2">View Invoice</button>
                            <div className="order-list">
                                {
                                    order.orderItems.map((item:any,i:any)=>(
                                        <div className="row" key={i}>
                                            <div className="col-3">
                                                <div className="center"><img src={`${server}/${item.photo}`} alt="image" style={{height:'50px',maxWidth:'100px'}}/></div></div>
                                            <div className="col-3 fs ">{item.name}</div>
                                            <div className="col-3 fs ">Price : {item.price}</div>
                                            <div className="col-3 fs ">X {item.quantity}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            </div>
                            <div className="col-6 order-shipping-info w100" >
                                <h4 style={{marginBottom:"1.2rem"}}>Shipping Info</h4>
                                <h6 className="res-sbtn">
                                    Name : <span>{order.shippingInfo.name}</span> 
                                </h6>
                                <p className="res-sbtn">Phone : <span>{order.shippingInfo.phoneNumber}</span></p>
                                <p className="res-sbtn">Address : <span>{order.shippingInfo.address}</span></p>
                                <p className="res-sbtn">City : <span>{order.shippingInfo.city}</span></p>
                                <p className="res-sbtn">Pin code : <span>{order.shippingInfo.pinCode}</span></p>
                                <p className="res-sbtn">State : <span>{order.shippingInfo.state}</span></p>
                            </div>
                        </div>
                        </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Myorders;
