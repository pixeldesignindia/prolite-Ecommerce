import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { userExist, userNotExist } from "./redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/api/userApi";
import { UserReducerInitialState } from "./types/reducerTypes";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";


const Home = lazy(() => import("./pages/home/Home"));
const Product = lazy(() => import("./pages/product/Product"));
const Login = lazy(() => import("./pages/login/Login"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Register = lazy(() => import("./pages/register/Register"));
const Prolite = lazy(() => import("./pages/search/Prolite"));
const Autoglo = lazy(() => import("./pages/search/AutoGlo"));
const Shipping = lazy(() => import("./pages/shipping/Shipping"));
const Orders = lazy(()=>import('./pages/orders/Orders'))
const Order = lazy(()=>import('./pages/order/Order'))
const Checkout = lazy(()=>import('./pages/checkOut/Checkout'))
const Delivery = lazy(()=>import('./pages/delivery/Delivery'))
const Payment = lazy(()=>import('./pages/payment/Payment'))
const Privacy = lazy(()=>import('./pages/privacy/Privacy'))
const Refund = lazy(()=>import('./pages/refund/Refund'))
const Terms = lazy(()=>import('./pages/terms/Terms'))
// Admin Imports
const Products = lazy(() => import("./pages/admin/Products"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Transaction = lazy(() => import("./pages/admin/Transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/Barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/Piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/Linecharts"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Coupon = lazy(() => import("./pages/admin/apps/Coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/Stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/Toss"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Myorder = lazy(() => import("./pages/profile/Myorders"));
const NewProductPage = lazy(() => import("./pages/admin/management/Newproduct"));
const ProductManagement = lazy(() => import("./pages/admin/management/Productmanagement"));
const TransactionManagement = lazy(() =>import("./pages/admin/management/Transactionmanagement"));

const App = () => {

const dispatch= useDispatch()
const {user}= useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer)

useEffect(()=>{
onAuthStateChanged(auth,async(user)=>{
if(user){
  const data = await getUser(user.uid)
  dispatch(userExist(data.user)) }
else{dispatch(userNotExist())}
})},[]);

  return (
    <BrowserRouter >
      <Suspense fallback={<h5>Loading...</h5>}>
        <Header user={user || null}/>
        <Routes>
          <Route path="*" element={<>hi manas</>} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path="/refund" element={<Refund/>} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/login" element={<ProtectedRoute isAuthenticated={user?false:true}><Login /></ProtectedRoute> } />
          <Route path="/register" element={<ProtectedRoute isAuthenticated={user?false:true}><Register/></ProtectedRoute> } />

            <Route path="/prolite" element={<Prolite />} />
            <Route path="/autoglo" element={<Autoglo/>} />
            
            <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/myOrders" element={<Myorder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/shipping" element={<Shipping/>} />
            {/* <Route path="/order/:id" element={<OrderDetails />} /> */}
            <Route path="/pay" element={<Checkout />} /> 
          </Route> 
          {/* Admin Routes */}
          <Route element={<ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role==="admin" ? true : false} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/customer" element={<Customers />} />
          <Route path="/admin/transaction" element={<Transaction />} />
          {/* Charts */}
          <Route path="/admin/chart/bar" element={<Barcharts />} />
          <Route path="/admin/chart/pie" element={<Piecharts />} />
          <Route path="/admin/chart/line" element={<Linecharts />} />
          {/* Apps */}
          <Route path="/admin/app/coupon" element={<Coupon />} />
          <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
          <Route path="/admin/app/toss" element={<Toss />} />
          {/* Management */}
          <Route path="/admin/product/new" element={<NewProductPage/>} />
          <Route path="/admin/product/:id" element={<ProductManagement />} />
          <Route path="/admin/transaction/:id" element={<TransactionManagement />}
          />
          </Route>;
        </Routes>
        
      </Suspense>
      <Toaster position="top-right"/>
    </BrowserRouter>
  );
};

export default App;
