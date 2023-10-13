import axios from 'axios';
import { server } from '../../server';

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, { withCredentials: true });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    })
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response ? error.response.data.message : "Unknown error",
    });
    console.error(error); // Log the error for debugging purposes
  }
}

// Load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, { withCredentials: true });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    })
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response ? error.response.data.message : "Unknown error",
    });
    console.error(error); // Log the error for debugging purposes
  }
}

// user update information
export const updateUserInformation = (email, password, phoneNumber, name) => async(dispatch) => {
  try {
    dispatch({
      type: "updateUserInfoRequest",
    });
  
    const {data} = await axios.put(`${server}/user/update-user-info`,{
      email,
      password,
      phoneNumber,
      name,
    }, {
      withCredentials: true,
    })
  
    dispatch({
      type:"updateUserInfoSuccess",
      payload: data.user,
    })
  } catch (error) {
    dispatch({
      type: "updateUserInfoFailed",
      payload: error.response.data.message,
    })
  }
}

//  update user information
export const updateUserAddress = (country,city,address1,address2,zipCode, addressType) => async(dispatch) => {
  try {
    dispatch({
      type: "updateUserAddressRequest",
      // payload: error.response.data.message,
    })

    const {data} = await axios.put(`${server}/user/update-user-addresses`,{
      country,
      city,
      address1,
      address2,
      zipCode,
      addressType,
    }, {withCredentials: true})
    // console.log("Send Data is ",data);
    dispatch({
      type: "updateUserAddressSuccess",
      payload: {
        successMessage:"User address updated successfully",
        user: data.user
      },
    });
  } catch (error) {
    dispatch({
      type: "updateUserAddressFailed",
      payload: error.response.data.message,
    })
  }
}

// delete user Address
export const deleteUserAddress = (id) => async(dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    })

    const {data} = await axios.delete(`${server}/user/delete-user-address/${id}`, {withCredentials: true})

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage:"Address Deleted Successfully",
        user: data.user
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    })
  }
}

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};