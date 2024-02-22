import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { MdOutlineDeleteForever } from "react-icons/md";

interface CouponType {
  _id: string;
  code: string;
  amount: number;
}

const Coupon = () => {
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [prefix, setPrefix] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [coupon, setCoupon] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const generateCoupon = () => {
    axios.post(`${process.env.VITE_API_URL}api/v1/payments/new/coupon`, {
      code: prefix,
      amount: amount,
    })
    .then(() => {
      setCoupon(prefix);
      setPrefix("");
      setAmount(0);
      setIsCopied(false);
      getCoupons();
    })
    .catch(error => {
      console.error("Error generating coupon:", error);
    });
  };

  const getCoupons = () => {
    axios.get(`${process.env.VITE_API_URL}api/v1/payments/Coupons/all`)
    .then(response => {
      console.log(response);
      setCoupons(response.data.coupons);
      setPrefix("");
      setAmount(0);
      setIsCopied(false);
    })
    .catch(error => {
      console.error("Error getting coupons:", error);
    });
  };
  
  const deleteCoupon = (id: string) => {
    axios.delete(`${process.env.VITE_API_URL}api/v1/payments/coupon/${id}`)
      .then(() => getCoupons())
      .catch(error => {
        console.error("Error deleting coupon:", error);
      });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    getCoupons();
  }, []);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container coupon">
        <section>
          <h1>Coupon</h1>
          <form className="coupon-form" onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
            <button type="button" onClick={generateCoupon}>Generate</button>
          </form>

          {coupon && (
            <code>
              {coupon}
              <span onClick={() => copyToClipboard(coupon)}>
                {isCopied ? "Copied" : "Copy"}
              </span>
            </code>
          )}
        </section>
        <section className="coupon-list">
          {coupons.map((coupon) => (
            <div key={coupon._id} className="coupon-item">
              <p>ID: {coupon._id}</p>
              <p>Code: {coupon.code}</p>
              <p>Amount: {coupon.amount}</p>
              <button onClick={() => deleteCoupon(coupon._id)}>
                <MdOutlineDeleteForever style={{ color: 'red' }} />
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Coupon;
