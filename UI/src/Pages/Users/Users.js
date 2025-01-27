import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/Navbar/Navbar";
import ListInTable from "../../Components/DataTable/DataTable";
import { userRows, userColumns } from "../../MockData/UsersData";
import "../../App.sass";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { fetchAllProductsAPI, sellProductAPI ,deleteProductAPI} from "../../Components/ActionCreator/ActionCreator";

const Users = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // New state
  const [formData, setFormData] = useState({
    productQuantity: 1,
    customerMobile: "",
    customerName: "",
    productPrice: 500,
    serialNo: "",
  });
  const navigate = useNavigate();

  const handleDelete = async(id) => {
    try {
      const payload = {
        ProductId:id
      };

      const response = await deleteProductAPI(payload);
      if (response.data.businessStatusCode === 2) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        toast.success("Product Deleted successfully!");
      } else {
        toast.error("Failed to save product.");
      }
    } catch (error) {
      toast.error("An error occurred while saving.");
    }

  }

  const handleSellClick = (id) => {
    setSelectedProductId(id); // Set the selected product ID
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
      const payload = {
        productQuantity:parseInt(formData.productQuantity, 10),
        productId: selectedProductId, // Use the selected product ID here
        customerMobile: formData.customerMobile,
        customerName: formData.customerName,
        productPrice: parseInt(formData.productPrice, 10),
        serialNo: formData.serialNo,
      };

      const response = await sellProductAPI(payload);
      if (response.data.businessStatusCode === 2) {
        toast.success("Product sold successfully!");
        setShowModal(false); // Close the modal after saving
      } else {
        toast.error("Failed to save product.");
      }
    } catch (error) {
      toast.error("An error occurred while saving.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllProductsAPI();
        // let response = {
        //   availableProductList: [
        //     {
        //       category: null,
        //       date_added: "2024-06-15T23:17:01.756211Z",
        //       last_updated: "2024-06-23T23:05:36.553064Z",
        //       product_brand: "DELL",
        //       product_description: "Mouse Added",
        //       product_id: "PI1",
        //       product_name: "Mounse",
        //       product_price: "500.00",
        //       product_quantity: 3,
        //       product_status: "available",
        //       supplier_contact: null,
        //       supplier_name: "Sharad Kasar",
        //     },
        //     {
        //       category: null,
        //       date_added: "2024-06-15T23:19:07.095058Z",
        //       last_updated: "2024-06-23T23:05:36.553064Z",
        //       product_brand: "HP1",
        //       product_description: "Mouse Added",
        //       product_id: "PI2",
        //       product_name: "Mounse",
        //       product_price: "500.00",
        //       product_quantity: 3,
        //       product_status: "available",
        //       supplier_contact: null,
        //       supplier_name: "Sharad Kasar",
        //     },
        //   ],
        //   businessStatusCode: 2,
        //   httpResponseCode: 200,
        // };

        const rowsWithId = response.data.availableProductList.map((item) => ({
          ...item,
          id: item.product_id,
        }));
        setRows(rowsWithId);
      } catch (error) {
        toast.error("Error fetching data.");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <UserTable className="users_list_container">
            <div className="users_list_container_title">
              <h4 className="p-2 mb-0" style={{ fontWeight: 700, margin: "0.5rem 0 0 0", padding: "0 0.5rem", color: "#20B2AA" }}>
                Users handled by Admin
              </h4>
            </div>
            <ListInTable
              rows={rows}
              columns={[
                ...userColumns,
                {
                  field: "action",
                  headerName: "Action",
                  headerClassName: "custom_header",
                  width: 200,
                  renderCell: (params) => (
                    <div className="cell_action_div">
                      <button
                        onClick={() => handleSellClick(params.row.id)} // Pass the row ID here
                        style={{ background: "orange", color: "white", padding: "5px 10px" }}
                      >
                        Sell
                      </button>
                      {/* <div style={{ color: "blue" }}>
                        <EditIcon />
                      </div> */}
                      <div style={{ color: "gray",cursor:'pointer' }} onClick={() => handleDelete(params.row.id)} >
                        <DeleteIcon />
                      </div>
                    </div>
                  ),
                },
              ]}
              height={680}
              getRowId={(row) => row.product_id}
            />
          </UserTable>
        </div>
      </main>

      {/* Modal for Sell */}
      {showModal && (
        <Modal>
          <ModalContent>
            <h3>Sell Product</h3>
            <label>Product Quantity</label>
            <input
              type="number"
              name="productQuantity"
              value={formData.productQuantity}
              onChange={handleInputChange}
            />
            <label>Customer Mobile</label>
            <input
              type="text"
              name="customerMobile"
              value={formData.customerMobile}
              maxLength={10}
              onChange={handleInputChange}
            />
            <label>Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
            />
            <label>Product Price</label>
            <input
              type="number"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleInputChange}
            />
            <label>Product Serial No</label>
            <input
              type="text"
              name="serialNo"
              value={formData.serialNo}
              onChange={handleInputChange}
            />
            <div>
              <button className="btn" onClick={handleSave}>Sell</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

const UserTable = styled.div`
  z-index: 0;
  p,
  div.MuiTablePagination-actions > button {
    color: inherit;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;

  h3 {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-top: 10px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  div {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  button {
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    background-color: #20b2aa;
    color: white;
    border-radius: 4px;

    &:hover {
      background-color: #2e8b57;
    }
  }
`;

export default Users;
