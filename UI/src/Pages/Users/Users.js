import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProfileContext } from "../../App";
import { userRows, userColumns } from "../../MockData/UsersData";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/Navbar/Navbar";
import ListInTable from "../../Components/DataTable/DataTable";
import "../../App.sass";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchAllProductsAPI } from "../../Components/ActionCreator/ActionCreator";

const Users = () => {
  const [rows, setRows] = useState(userRows);
  const { userName } = useContext(ProfileContext);
  const navigate = useNavigate();

  function handleDelete(id) {
    setRows(rows.filter((row) => row.id !== id));
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom_header",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cell_action_div">
            <Link
              to="/users"
              style={{
                textDecoration: "none",
                color: "unset",
                background: "orange",
              }}
              className="view_btn"
            >
              Sell
            </Link>
            <div style={{ color: "blue" }}>
              <EditIcon />
            </div>
            <div
              style={{ color: "gray" }}
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    document.title = "Users | Admin Dashboard";
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetchAllProductsAPI();
        let response = {
          availableProductList: [
            {
              category: null,
              date_added: "2024-06-15T23:17:01.756211Z",
              last_updated: "2024-06-23T23:05:36.553064Z",
              product_brand: "DELL",
              product_description: "Mouse Added",
              product_id: "PI1",
              product_name: "Mounse",
              product_price: "500.00",
              product_quantity: 3,
              product_status: "available",
              supplier_contact: null,
              supplier_name: "Sharad Kasar",
            },
            {
              category: null,
              date_added: "2024-06-15T23:19:07.095058Z",
              last_updated: "2024-06-23T23:05:36.553064Z",
              product_brand: "HP1",
              product_description: "Mouse Added",
              product_id: "PI2",
              product_name: "Mounse",
              product_price: "500.00",
              product_quantity: 3,
              product_status: "available",
              supplier_contact: null,
              supplier_name: "Sharad Kasar",
            },
          ],
          businessStatusCode: 2,
          httpResponseCode: 200,
        };
        if (response.status === 200 && response.data.businessStatusCode === 2) {
          setRows();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error(
            "Your Session has expired. You will be redirected to Login Page."
          );
          navigate("/");
        } else if (error.response && error.response.status === 429) {
          toast.error(
            "Too Many Requests: You have exceeded the rate limit. Please try again later."
          );
        } else {
          toast.error(
            "There appears to be a technical issue connecting to our servers. Could you please try again later."
          );
        }
        console.error("Error fetching loan data:", error);
      }
    };

    fetchData();
  }, []); // Add dependencies as needed

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <UserTable className="users_list_container">
            <div className="users_list_container_title">
              <h4
                className="p-2 mb-0"
                style={{
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  padding: "0 0.5rem",
                  color: "#20B2AA",
                }}
              >
                Users handled by Admin | {userName}
              </h4>
            </div>
            <ListInTable
              rows={rows}
              columns={userColumns.concat(actionColumn)}
              height={680}
            />
          </UserTable>
        </div>
      </main>
    </>
  );
};

export const UserTable = styled.div`
  z-index: 0;
  /* Resetting MUI table color props */
  p,
  div.MuiTablePagination-actions > button {
    color: inherit;
  }
  /* END */
`;

export default Users;
