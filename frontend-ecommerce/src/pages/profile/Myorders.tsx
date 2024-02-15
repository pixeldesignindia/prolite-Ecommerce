import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducerTypes";
import "./profile.css";
import Accordion from "react-bootstrap/Accordion";
import ProfileSide from "../../components/sideNavProfile/ProfileSide";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import { server } from "../../redux/store";
const Myorders = () => {
    const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );
    const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);
    console.log(isLoading, data, isError, error);

    return (
    <div className="profile-page bg-blue">
        <ProfileSide name={user?.name} />
        <div className="profileLeft center">
        <div className="profileBody orderBody">
            <div className="profile-data">
            <h3 className="text-center">My Orders</h3>
            <div className="profile-myorder">
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                {data &&
                    data?.orders.map((order, i) => (
                        <Accordion.Item eventKey={i.toString()} key={i}>
                        <Accordion.Header><div className="row" style={{width:'100%'}}>
                            <div className="col-4 text-center">{order._id}</div> 
                            <div className="col-2 text-center">Quantity: {order.orderItems.length}</div> 
                            <div className={
                order.status === "Processing"? "col-2 text-center red": order.status === "Shipped"? "col-2 green text-center": "col-2 purple text-center"}>{order.status}</div> 
                            <div className="col-2 text-center">Total : {order.total}</div> 
                            <div className="col-2 text-center">{new Date(order.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })}</div> 
                            </div></Accordion.Header>
                        <Accordion.Body>
                        <div className="row">
                            <div className="col-6">
                            <h4 style={{marginBottom:"1.2rem"}}>Order Info</h4>
                            <div className="order-list">
                                {
                                    order.orderItems.map((item,i)=>(
                                        <div className="row" key={i}>
                                            <div className="col-3">
                                                <div className="center"><img src={`${server}/${item.photo}`} alt="image" style={{height:'50px'}}/></div></div>
                                            <div className="col-3 fs ">{item.name}</div>
                                            <div className="col-3 fs ">Price : {item.price}</div>
                                            <div className="col-3 fs ">Quantity : {item.quantity}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            </div>
                            <div className="col-6 order-shipping-info" >
                                <h4 style={{marginBottom:"1.2rem"}}>Shipping Info</h4>
                                <h6>
                                    Name : {order.shippingInfo.name}
                                </h6>
                                <p>Phone : {order.shippingInfo.phoneNumber}</p>
                                <p>Address : {order.shippingInfo.address}</p>
                                <p>City : {order.shippingInfo.city}</p>
                                <p>Pin code : {order.shippingInfo.pinCode}</p>
                                <p>State : {order.shippingInfo.state}</p>
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
