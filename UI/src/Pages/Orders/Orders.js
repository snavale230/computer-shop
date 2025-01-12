import React, { useState, useContext, useEffect } from "react";
import { LoaderContext, ProfileContext } from "../../App";
import { data } from "../../MockData/ChartData";

import Loader from "../../Components/Loader/Loader";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/Navbar/Navbar";
import TransactionDataTable from "./TransactionDataTable";
import SellDataTable from "./SalesTransactionTable";
import { addProductHistoryAPI, sellProductHistoryAPI } from "../../Components/ActionCreator/ActionCreator";
import { toast } from "react-toastify";
import OrderSummary from "./OrderSummary";

import "../../App.sass";
import "../../Pages/Orders/Orders.sass";
import "../../Pages/Home/Home.sass";

const Orders = () => {
  const { isLoading } = useContext(LoaderContext);
  const { userName } = useContext(ProfileContext);
  const [selectedRowId, setSelectedRowId] = useState([]);
  const [chartData, setChartData] = useState(data);
  const [activeTab, setActiveTab] = useState("products"); // Track active tab

  // Fetch data based on the active tab
  const fetchData = async (tab) => {
    try {
      if (tab === "products") {
        const response = await addProductHistoryAPI();
        const rowsWithId = response.data.addProductHistory.map((item) => ({
          ...item,
          id: item.product_id,
        }));
        setSelectedRowId(rowsWithId);
      } else if (tab === "sales") {
        const response = await sellProductHistoryAPI();
        const rowsWithId = response.data.saleProductList.map((item) => ({
          ...item,
          id: item.product_id,
        }));
        setSelectedRowId(rowsWithId);
      }
    } catch (error) {
      toast.error("Error fetching data.");
    }
  };

  // Load products data initially
  useEffect(() => {
    document.title = "Orders | Admin Dashboard";
    fetchData("sales");
  }, []);

  // Fetch data when the active tab changes
  useEffect(() => {
    if (activeTab) {
      fetchData(activeTab);
    }
  }, [activeTab]);

  const handleRowClick = (id) => {
    setSelectedRowId(id);
    const newChartData = chartData.map((week) => ({
      ...week,
      totalOrders: Math.floor(Math.random() * 5000) + 1000,
      ordersDelivered: Math.floor(Math.random() * 3000) + 500,
      ordersPending: Math.floor(Math.random() * 3000) + 500,
    }));
    setChartData(newChartData);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="dashboard_container_main">
          <Sidebar />
          <div className="dashboard_container_right_panel">
            <Navbar />
            <div className="order_info_container_div">
              <h4 style={{ fontWeight: 700, margin: "0.5rem 0", color: "#20B2AA" }}>
                Orders handled by Admin | {userName}
              </h4>
              {/* Tab navigation */}
              <div className="tab-navigation">
                {/* <button onClick={() => setActiveTab("products")}>Add Products History</button> */}
                <button onClick={() => setActiveTab("sales")}>Sell Product History</button>
              </div><hr/>
              {/* Tab content */}
              <div className="tab-content">
                {
                  <SellDataTable onRowClick={handleRowClick} tableRows={selectedRowId} />
                }
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Orders;
