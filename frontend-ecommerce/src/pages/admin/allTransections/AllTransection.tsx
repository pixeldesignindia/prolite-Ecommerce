import axios from "axios";
import "./altransection.css";
import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { UserReducerInitialState } from "../../../types/reducerTypes";
import { useSelector } from "react-redux";

const AllTransection = () => {
  const [withOutDate, setWithOutDate] = useState<any>(null);
  const [withDate, setWithDate] = useState<any>(null);
  const [date, setDate] = useState<string>("");

  const [currentPageCard, setCurrentPageCard] = useState<number>(1);
  const [currentPageCash, setCurrentPageCash] = useState<number>(1);
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const getData = async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL}api/v1/statistics/dateWiseTransactions?id=${user?._id}`;
      if (date !== "") {
        const formattedDate = formatDate(date);
        url += `&date=${formattedDate}`;
      }
      const { data } = await axios.get(url);
      console.log(data);
      
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (inputDate: string) => {
    const dateObj = new Date(inputDate);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        if ("sixMonthResults" in data) {
          setWithOutDate(data.sixMonthResults);
        } else {
          setWithDate(data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [date]);

  const renderCardTransactions = () => {
    if (!withOutDate || !withOutDate.transactions || !withOutDate.transactions.CARD) {
      return null;
    }

    const cardTransactions = withOutDate.transactions.CARD;
    const itemsPerPage = 10;

    const renderTransactions = (transactions: any[], currentPage: number) => {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);

      return currentTransactions.map((transaction: any, index: number) => (
        <div key={index} className="transactionItem">
          <p>Date: {transaction.date}</p>
          <p>Total Amount: {transaction.totalAmount}</p>
        </div>
      ));
    };

    return (
      <>
        <div className="trasectionList">{renderTransactions(cardTransactions, currentPageCard)}</div>
        {cardTransactions.length > itemsPerPage && (
          <ul className="pagination-list">
          {Array.from(Array(Math.ceil(cardTransactions.length / itemsPerPage)), (_, i) => (
            <li key={i} onClick={() => setCurrentPageCard(i + 1)} className={`pagination-item ${i + 1 === currentPageCard ? "active" : ""}`}>
              {i + 1}
            </li>
          ))}
        </ul>
        
        )}
      </>
    );
  };

  const renderCashTransactions = () => {
    if (!withOutDate || !withOutDate.transactions || !withOutDate.transactions.CASH) {
      return null;
    }

    const cashTransactions = withOutDate.transactions.CASH;
    const itemsPerPage = 10;

    const renderTransactions = (transactions: any[], currentPage: number) => {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);

      return currentTransactions.map((transaction: any, index: number) => (
        <div key={index} className="transactionItem">
          <p>Date: {transaction.date}</p>
          <p>Total Amount: {transaction.totalAmount}</p>
        </div>
      ));
    };

    return (
      <>
        <div className="trasectionList">{renderTransactions(cashTransactions, currentPageCash)}</div>
        {cashTransactions.length > itemsPerPage && (
          <ul className="pagination-list">
          {Array.from(Array(Math.ceil(cashTransactions.length / itemsPerPage)), (_, i) => (
            <li key={i} onClick={() => setCurrentPageCash(i + 1)} className={`pagination-item ${i + 1 === currentPageCash ? "active" : ""}`}>
              {i + 1}
            </li>
          ))}
        </ul>
        
        )}
      </>
    );
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {date !== "" ? renderDateWiseTransactions() : renderMonthlyTransactions()}
      </main>
    </div>
  );

  function renderDateWiseTransactions() {
    if (!withDate) return null;

    return (
      <div className="transaction-container">
        <div className="transaction-header">
          <h2>Transactions</h2>
          <div className="dateInputDiv">
            <button onClick={() => setDate("")}>Reset</button>
            <p>Date</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="transaction-table">
          <table>
            <thead>
              <tr>
                <th>Payment Method</th>
                <th>Product Details</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {withDate?.map((transaction: any, index: number) => (
                <tr key={index}>
                  <td>{transaction.paymentMethod}</td>
                  <td>
                    {transaction.orderItems.map((item: any, idx: number) => (
                      <div key={idx} className="product-detailsWD">
                        <div className="orderImg">
                          <img src={item.photo} alt={item.name} />
                        </div>
                        <div className="tr-data">
                          <p>{item.name} , </p>
                          <p>Price: ₹{item.price} , </p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </td>

                  <td>
                    {transaction.orderItems.reduce(
                      (acc: number, item: any) => acc + item.quantity,
                      0
                    )}
                  </td>
                  <td>{transaction.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderMonthlyTransactions() {
    if (!withOutDate) return null;

    return (
      <div className="monthely-transection">
        <div className="transactionItem">
          <h2>Transactions</h2>{" "}
          <div>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <div className="transectionBox">
              <div className="trasectionHead">
                <h2 className="text-center">Card Transactions</h2>
              </div>
              {renderCardTransactions()}
            </div>
            <div className="transectionBox mt-3">
              <div className="trasectionHead">
                <h2 className="text-center">Overall Card Transaction</h2>
                <h4 className="text-center">{withOutDate.overallTotalCard}</h4>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="transectionBox">
              <div className="trasectionHead">
                <h2 className="text-center">Cash Transactions</h2>
              </div>
              {renderCashTransactions()}
            </div>
            <div className="transectionBox mt-3">
              <div className="trasectionHead">
                <h2 className="text-center">Overall Cash Transaction</h2>
                <h4 className="text-center">{withOutDate.overallTotalCash}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AllTransection;
