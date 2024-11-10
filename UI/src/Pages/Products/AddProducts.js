import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { productListTableColumns } from "../../MockData/ProductData";
import { addProductAPI } from "../../Components/ActionCreator/ActionCreator";
import { toast } from 'react-toastify';
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/Navbar/Navbar";
import ListInTable from "../../Components/DataTable/DataTable";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import "../../Styles/AddItem.sass";

const AddProducts = () => {
 
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("available");
  const [quantity, setQuantity] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productRows, setProductRows] = useState([]);
  const UUID = uuidv4();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if price and quantity are numbers and within allowed ranges
    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseFloat(quantity);
    // if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
    //   alert("Price and Quantity must be a number.");
    //   return;
    // } else if (parsedPrice > 2000 || parsedQuantity > 20) {
    //   alert("Price cannot exceed 2000, and Quantity cannot exceed 20.");
    //   return;
    // }
  
    // Check if all fields are filled in
    if ( !productName || !price || !brand || !status || !quantity) {
      alert("Please fill in all fields");
      return;
    }
  
    // Construct payload object
    const payload = {
      productName: productName,
      productBrand: brand,
      productStatus: status,
      productPrice: parsedPrice,
      productQuantity: parsedQuantity,
      productDescription: productDescription,
      supplierName: supplierName
    };
  
    try {
      const response = await addProductAPI(payload);
      if (response.status === 200 && response.data.businessStatusCode === 2) {
        // navigate("/home");
      } else {
        // API error: Set the error message
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Your Session has expired. You will be redirected to Login Page.");
      } else if (error.response && error.response.status === 429) {
        toast.error("Too Many Requests: You have exceeded the rate limit. Please try again later.");
      } else {
        toast.error("There appears to be a technical issue connecting to our servers. Could you please try again later.")
      }
      console.error("Error fetching loan data:", error);
    } 
    // Display payload in console (you can remove this in production)
    console.log("Payload :- ", payload);
  
    // Clear form fields and update productRows state
    const newProduct = {
      id: uuidv4(),
      productName: productName.substring(0, 50),
      price: parsedPrice,
      brand: brand.substring(0, 20),
      status: status.substring(0, 20),
      quantity: parsedQuantity,

    };
  
    setProductRows([...productRows, newProduct]);
    setProductName("");
    setPrice("");
    setBrand("");
    setStatus("");
    setQuantity("");
    setSupplierName("");
    setProductDescription("");
  }

  function handleDelete(id) {
    setProductRows(productRows.filter((row) => row.id !== id));
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
              style={{ textDecoration: "none", color: "unset" }}
            >
              <div className="view_btn">View</div>
            </Link>
            <div
              className="delete_btn"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    document.title = "New Products | Admin Dashboard";
  }, []);

  
  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="add_item_title_div">
            <h6>Add products</h6>
          </div>
          <div className="add_item_container">
            <div className="add_user_item_div_wrapper">
              <div className="add_user_item_div">
                <div className="form_div">
                  <form onSubmit={handleSubmit}>
                    <div className="form_input_div">
                      <div className="form_input">
                        <label>Product Name</label>
                        <input
                          type="text"
                          value={productName}
                          placeholder="Macbook"
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                      <div className="form_input">
                        <label>Product Price</label>
                        <input
                          type="text"
                          value={price}
                          inputMode="numeric"
                          placeholder="price"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="form_input">
                        <label>Product Brand</label>
                        <input
                          value={brand}
                          type="mail"
                          placeholder="Apple"
                          onChange={(e) => setBrand(e.target.value)}
                          maxLength={20}
                        />
                      </div>
                      <div className="form_input">
                        <label>Product Status</label>
                        <input
                          type="text"
                          value={status}
                          placeholder="Available/Not Available"
                          onChange={(e) => setStatus(e.target.value)}
                          maxLength={20}
                          disabled
                        />
                      </div>
                      <div className="form_input">
                        <label>Product Quantitiy</label>
                        <input
                          value={quantity}
                          type="text"
                          inputMode="numeric"
                          placeholder="quantity"
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                      <div className="form_input">
                        <label>Product Description</label>
                        <input
                          value={productDescription}
                          type="text"
                          placeholder="product added"
                          onChange={(e) => setProductDescription(e.target.value)}
                        />
                      </div>
                      <div className="form_input">
                        <label>Supplier Name</label>
                        <input
                          value={supplierName}
                          type="text"
                          placeholder="Ram Das"
                          onChange={(e) => setSupplierName(e.target.value)}
                        />
                      </div>
                    <button type="submit">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="item_list_div">
              {productRows.length > 0 && ( 
                <>
                  <h6 className="px-2 mb-0 mt-2">List of products</h6>
                  <ListInTable
                    key={UUID}
                    rows={productRows}
                    columns={productListTableColumns.concat(actionColumn)}
                    height={400}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddProducts;
