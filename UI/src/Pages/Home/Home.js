import React, { useEffect, useContext } from "react";
import { ThemeContext, LoaderContext } from "../../App";
import { motion } from "framer-motion";
import TransactionDataTable from "../Orders/TransactionDataTable";
// import { transactionTableData } from "../../MockData/TransactionData";
import { data } from "../../MockData/ChartData";
import Orders from "../Orders/Orders";
import Loader from "../../Components/Loader/Loader";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/Navbar/Navbar";
import Card from "../../Components/Card/Card";
import SummaryCards from "../../Components/Card/SummaryCards";
import Chart from "./Chart";

import "../../App.sass";
import "./Home.sass";

const Home = () => {
  const { handleDarkMode } = useContext(ThemeContext);
  const { isLoading } = useContext(LoaderContext);

  useEffect(() => {
    document.title = "Home | Admin Dashboard";
  }, []);

  return (
    <>
      {" "}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <main className="dashboard_container_main">
              <Sidebar />
              <div className="dashboard_container_right_panel" id="report_page">
                <Navbar handleDarkMode={handleDarkMode} />
                <div className="cards_container">
                  <Card
                    type="sales"
                    backgroundColor={
                      "linear-gradient(to right, #11998e, #2bba32)"
                    }
                  />
                  <Card
                    type="orders"
                    backgroundColor={
                      "linear-gradient(to right, #0a9bcc, #6952d9)"
                    }
                  />
                  <Card
                    type="products"
                    backgroundColor={
                      "linear-gradient(to right, #d97402, #eba45e)"
                    }
                  />
                  <Card
                    type="users"
                    backgroundColor={
                      "linear-gradient(to right, #00b4db, #089acc)"
                    }
                  />
                </div>
                {/* <div className="charts_container">
                  <Chart
                    title="Orders in last 4-weeks"
                    data={data}
                    fillColor1="#2196f3"
                    fillColor2="#4caf50"
                    fillColor3="#ff9800"
                  />
                </div> */}
                <div className="summary_cards_container">
                  <SummaryCards />
                </div>
                {/* <div className="lists_container">
                  <h4 className="p-2">Latest Tranaction</h4>
                  <Orders/>
                </div> */}
              </div>
            </main>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Home;
