// import nodemailer from 'nodemailer';
// import { Order } from '../models/order.js';
// import { TryCatch } from '../middlewares/error.js';
// import { myCache } from '../app.js';
// import { User } from '../models/user.js';
// import ErrorHandler from '../utils/utility-class.js';
// import { OrderItemType } from '../types/types.js';
// export const generateInvoice = TryCatch(async (req, res, next) => {
//   const { id } = req.params;
//   const key = `order-${id}`;

//   let orders;

//   if (myCache.has(key)) {
//     orders = JSON.parse(myCache.get(key) as string);
//   } else {
//     orders = await Order.findById(id).populate('shippingInfo');
//     myCache.set(key, JSON.stringify(orders));
//   }
// const user = await User.findById(orders.user)
//   // Generate HTML invoice
//   if(!user) return next(new ErrorHandler("email not found",404))
//   const invoiceHtml = generateInvoiceHtml(orders);

//   // Send invoice by email
//   sendEmailWithInvoice(invoiceHtml,user.email);

//   return res.status(200).send({
//     success: true,
//     invoiceHtml,
//     // orders,
//   });
// });

// function generateInvoiceHtml(orders: any) {
//   const shippingInfo = orders.shippingInfo;
//   const orderItems:OrderItemType[] = orders.orderItems;

//   let html = `
//     <h2>Invoice</h2>
//     <p><strong>Order ID:</strong> ${orders._id}</p>
//     <h3>Shipping Information</h3>
//     <p><strong>Name:</strong> ${shippingInfo.name}</p>
//     <p><strong>Phone Number:</strong> ${shippingInfo.phoneNumber}</p>
//     <p><strong>Address:</strong> ${shippingInfo.address}</p>
//     <p><strong>City:</strong> ${shippingInfo.city}</p>
//     <p><strong>State:</strong> ${shippingInfo.state}</p>
//     <p><strong>Country:</strong> ${shippingInfo.country}</p>
//     <p><strong>Pin Code:</strong> ${shippingInfo.pinCode}</p>
//     <h3>Order Items</h3>
//     <ul>
//   `;

//   orderItems.forEach(item => {
//     html += `
//       <li>
//         <p><strong>Name:</strong> ${item.name}</p>
//         <p><strong>Price:</strong> ${item.price}</p>
//         <p><strong>Quantity:</strong> ${item.quantity}</p>
//       </li>
//     `;
//   });

//   html += `</ul>`;
//    html += `
//     <h3>Invoice Summary</h3>
//     <p><strong>Subtotal:</strong> ${orders.subtotal}</p>
//     <p><strong>Discount:</strong> ${orders.discount}</p>
//     <p><strong>Tax:</strong> ${orders.tax}</p>
//     <p><strong>Shipping Charges:</strong> ${orders.shippingCharges}</p>
//     <p><strong>Total:</strong> ${orders.total}</p>
//   `;

//   return html;
// }

// function sendEmailWithInvoice(html: string, userEmail: string) {
//   // Create transporter
// const transporter = nodemailer.createTransport({
//   host: 'smtp.zoho.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'manas@pixeldesignindia.com', // Your Zoho Mail email address
//     pass: 'Manas@2023#', // Your Zoho Mail password
//   },
// });

//   // Email options
// const mailOptions = {
//   from: 'your_email@your_domain.com', // Your Zoho Mail email address
//   to: userEmail,
//   subject: 'Invoice',
//   html: html,
// };
//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// }
