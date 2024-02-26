import React from 'react';
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import { useParams } from "react-router-dom";
import { server } from '../../redux/store';
import { FaDownload } from "react-icons/fa6";
import './order.css'
interface Invoicedata {
    _id: string;
    status: string;
    createdAt: string;
    orderItems: {
        name: string;
        photo: string;
        price: number;
        quantity: number;
    }[];
    subtotal: number;
    discount: number;
    shippingCharges: number;
    tax: number;
    total: number;
    name: string;
    phoneNumber: number;
    shippingInfo: {
        address: string;
        city: string;
        pinCode: number;
        state: string;
        country: string;
    };
}

const Order: React.FC = () => {
    const { id } = useParams<{ id: string }>(); 
    const { data, isLoading, isError } = useOrderDetailsQuery(id || '');
console.log(data?.orders);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !data) {
        return <div>Error occurred while fetching order details</div>;
    }
    const handlePrint = () => {
        window.print();
      };
    
    return (
<div className="invoice">
  <h1 className='text-center no-print'>Invoice</h1>
  
  <div className="table-container">
    <h4>Order Details</h4>
    <table>
      <tbody>
        <tr>
          <th>Order ID</th>
          <td>{data?.orders?._id}</td>
        </tr>
        <tr>
          <th>Order Status</th>
          <td>{data?.orders?.status}</td>
        </tr>
        <tr>
          <th>Order Date</th>
          <td>{new Date(data?.orders?.createdAt).toLocaleString()}</td>
        </tr>
        {/* Render other order details as needed */}
      </tbody>
    </table>
  </div>
  
  <div className="table-container">
    <h4>Order Items</h4>
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {data?.orders?.orderItems?.map((item, index) => (
          <tr key={index}>
            <td><img src={`${server}/${item.photo}`} alt={item.name} /></td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  <div className="table-container">
    <h4>Summary</h4>
    <table>
      <tbody>
        <tr>
          <th className='text-center-tble'>Subtotal</th>
          <td className='text-center-tble'>{data?.orders.subtotal}</td>
        </tr>
        <tr>
          <th className='text-center-tble'>Discount</th>
          <td className='text-center-tble'>{data?.orders.discount}</td>
        </tr>
        <tr>
          <th className='text-center-tble'>Shipping Charges</th>
          <td className='text-center-tble'>{data?.orders.shippingCharges}</td>
        </tr>
        <tr>
          <th className='text-center-tble'>Tax</th>
          <td className='text-center-tble'>{data?.orders.tax}</td>
        </tr>
        <tr>
          <th className='text-center-tble'>Total</th>
          <td className='text-center-tble'>{data?.orders.total}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div className="table-container">
    <h4>Shipping Information</h4>
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <td>{data?.orders?.shippingInfo?.name}</td>
        </tr>
        <tr>
          <th>Phone Number</th>
          <td>{data?.orders?.shippingInfo?.phoneNumber}</td>
        </tr>
        <tr>
          <th>Address</th>
          <td>{data?.orders?.shippingInfo?.address}</td>
        </tr>
        <tr>
          <th>City</th>
          <td>{data?.orders?.shippingInfo?.city}</td>
        </tr>
        <tr>
          <th>Pin Code</th>
          <td>{data?.orders?.shippingInfo?.pinCode}</td>
        </tr>
        <tr>
          <th>State</th>
          <td>{data?.orders?.shippingInfo?.state}</td>
        </tr>
        <tr>
          <th>Country</th>
          <td>{data?.orders?.shippingInfo?.country}</td>
        </tr>
      </tbody>
    </table>
    <div className="print no-print center">
        <button onClick={handlePrint}>Download <FaDownload /></button>
    </div>
  </div>
</div>

    );
}

export default Order;
