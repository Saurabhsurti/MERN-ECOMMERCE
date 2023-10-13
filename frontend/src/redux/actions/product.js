import axios from "axios";
import { server } from "../../server";

// Create Product
export const createProduct = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.post(
      `${server}/product/create-product`,
      data,
      config
    );

    dispatch({
      type: "productCreateSuccess",
      payload: response.data.product, // Access 'data' directly
    });
  } catch (error) {
    if (error.response) {
      // Axios received an HTTP response with an error status code
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    } else if (error.message) {
      // Handle other errors (e.g., network issues or Axios configuration errors)
      dispatch({
        type: "productCreateFail",
        payload: error.message,
      });
    } else {
      // Fallback error handling
      dispatch({
        type: "productCreateFail",
        payload: "An unknown error occurred.",
      });
    }
  }
};


// Create Product
// export const createProduct =
//   (
//     name,
//     description,
//     category,
//     tags,
//     originalPrice,
//     discountPrice,
//     stock,
//     shopId,
//     images
//   ) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: "productCreateRequest",
//       });

//       const { data } = await axios.post(
//         `${server}/product/create-product`,
//         name,
//         description,
//         category,
//         tags,
//         originalPrice,
//         discountPrice,
//         stock,
//         shopId,
//         images,
//       );
//       dispatch({
//         type: "productCreateSuccess",
//         payload: data.product,
//       });
//     } catch (error) {
//       dispatch({
//         type: "productCreateFail",
//         payload: error.response.data.message,
//       });
//     }
//   };

// get All Products of a shop
export const getAllProductsShop = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "getAllProductsShopRequest",
            
        })
        const {data} = await axios.get(`${server}/product/get-all-products-shop/${id}`)
        // console.log("action ",data.products)
        
        dispatch({
            type:"getAllProductsShopSuccess",
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: "getAllProductsShopFailed",
            payload: error.response.data.message,
        });
    }
}

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteProductRequest",
      });
  
      const { data } = await axios.delete(`${server}/product/delete-shop-product/${id}`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "deleteProductSuccess",
        payload: data.message,
      });
    } catch (error) {
      if (error.name === "AxiosError" && error.code === "ECONNABORTED") {
        // Request was aborted due to timeout or other reasons
        dispatch({
          type: "deleteProductFailed",
          payload: "Request aborted. Please check your internet connection and try again.",
        });
      } else if (error.response && error.response.data && error.response.data.message) {
        // Handle Axios error with response data
        dispatch({
          type: "deleteProductFailed",
          payload: error.response.data.message,
        });
      } else {
        // Handle other types of errors
        dispatch({
          type: "deleteProductFailed",
          payload: "An error occurred while deleting the product.",
        });
      }
    }
  };

  // get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
      
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};