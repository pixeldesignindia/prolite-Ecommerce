// import { useSelector } from "react-redux";
// import { UserReducerInitialState } from "../../../types/reducerTypes"; 
import '../../profile/profile.css'
import { useMyOrdersQuery } from "../../../redux/api/orderApi";
import { server } from "../../../redux/store"; 
import { useNavigate, useParams } from "react-router-dom";
import './userOrder.css'

const UserOrder = () => {
    const navigate = useNavigate();
    const params = useParams();
    const {data} = useMyOrdersQuery(params.id!);
    console.log(data)

    return (
        <div className="profile-page ">
            <div className="profileLeft center " style={{justifyContent:'flex-end'}}>
                <div className="profileBody orderBody adminUserOrder">
                    <div className="profile-data">
                        <h3 className="text-center">User Orders</h3>
                        <div className="profile-myorder">
                            {data &&
                                data?.orders.map((order: any, i) => (
                                    <div className="amazon-order" key={i}>
                                        <div className="amazon-order-header">
                                            <div className="amazon-order-id">Order Id #{order._id}</div>
                                            <div className="amazon-order-status order-fs" style={{color: order.status === "Processing" ? "#1c39bb" : order.status === "Shipped" ? "#69359c" : order.status === "Delivered" ? "#0bda51" : "black" , fontWeight:'500'}}>{order.status}</div>
                                        </div>
                                        <div className="amazon-order-body">
                                        <div className="amazon-order-items">
                                            {order.orderItems.map((item: any, j: any) => (
                                                <div className="amazon-order-item" key={j}>
                                                    <div className="amazon-order-item-image">
                                                        <img src={`${server}/${item.photo}`} alt="Product" />
                                                    </div>
                                                    <div className="amazon-order-item-details">
                                                        <div>
                                                        <div className="amazon-order-item-name order-fs">{item.name}</div>
                                                        <div className="amazon-order-item-price order-fs">Price : {item.price}</div>
                                                        <div className="amazon-order-item-quantity order-fs">Quantity : {item.quantity}</div>
                                                        </div>
                                                        
                                                        {/* <div className="log-btn-c"><button className="log" onClick={()=>{navigate(`/product/${item.productId}`)}}>View Product</button></div> */}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="amazon-order-shipping order-fs">
                                            <h4>Shipping Info</h4>
                                            <p>Ordered At : <span> {new Date(order.createdAt).toLocaleString()}</span></p>
                                            <p>Name :  <span>{order.shippingInfo.name}</span>  </p>
                                            <p>Phone :  <span>{order.shippingInfo.phoneNumber}</span>  </p>
                                            <p>Address :  <span>{order.shippingInfo.address}</span>  </p>
                                            <p>City :  <span>{order.shippingInfo.city}</span>  </p>
                                            <p>Pin code :  <span>{order.shippingInfo.pinCode}</span>  </p>
                                            <p>State :  <span>{order.shippingInfo.state}</span>  </p>
                                        </div>
                                        <div className="amazon-order-actions">
                                            <button onClick={() => navigate(`/order/${order._id}`)} className="log">View Details</button>
                                        </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrder;
