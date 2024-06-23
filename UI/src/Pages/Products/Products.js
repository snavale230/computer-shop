import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { ProfileContext } from "../../App";
import {
  productListTableRows,
  productListTableColumns,
} from "../../MockData/ProductData";

import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/Navbar/Navbar";
import ListInTable from "../../Components/DataTable/DataTable";

import "../../App.sass";

const Products = () => {
  const { userName } = useContext(ProfileContext);

  useEffect(() => {
    document.title = "Products | Admin Dashboard";
  });

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="products_list_container">
            <div className="products_list_container_title">
            
            </div>
            <ListInTable
              rows={productListTableRows}
              columns={productListTableColumns}
              height={400}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export const ProductListContainer = styled.div`
  /* Resetting MUI table color props */
  p,
  .css-rtrcn9-MuiTablePagination-root .MuiTablePagination-selectLabel,
  div.MuiTablePagination-actions > button button {
    color: inherit;
  }

  .MuiToolbar-root {
    color: inherit;
  }
  /* END */
`;

export default Products;
