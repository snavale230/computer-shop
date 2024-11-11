import axios from "axios";
const domainURL = "http://localhost:1421";
// const domainURL = "";

const loginAPI = async (requestBody) => {
  try {
    const response = await axios.post(domainURL+
      "/shree-computer-shop/user-login",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const addProductAPI = async (requestBody) => {
  try {
    const response = await axios.post(domainURL + "/shree-computer-shop/add-product",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const fetchAllProductsAPI = async () => {
  try {
    const response = await axios.post(
      domainURL + "/shree-computer-shop/available-products",
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const sellProductAPI = async (requestBody) => {
    try {
      const response = await axios.post(
        domainURL + "/shree-computer-shop/sell-product",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      return response;
    } catch (error) {
      throw error;
    }
  };

  const sellProductHistoryAPI = async (requestBody) => {
    try {
      const response = await axios.post(
        domainURL + "/shree-computer-shop/fetch-sell-products",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      return response;
    } catch (error) {
      throw error;
    }
  };

  const addProductHistoryAPI = async (requestBody) => {
    try {
      const response = await axios.post(
        domainURL + "/shree-computer-shop/add-product-history",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      return response;
    } catch (error) {
      throw error;
    }
  };

  const deleteProductAPI = async (requestBody) => {
    try {
      const response = await axios.post(
        domainURL + "/shree-computer-shop/delete-product",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      return response;
    } catch (error) {
      throw error;
    }
  };
export {
  fetchAllProductsAPI,
  addProductAPI,
  loginAPI,
  sellProductAPI,addProductHistoryAPI,sellProductHistoryAPI,deleteProductAPI
};
