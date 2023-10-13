import axios from "axios";
import { server } from "../../server";

//  create event
// create event
export const createevent = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });
    
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.post(`${server}/event/create-event`, data, config);

    dispatch({
      type: "eventCreateSuccess",
      payload: response.data.event,
    });
  } catch (error) {
    if (error.response) {
      // Axios received an HTTP response with an error status code
      dispatch({
        type: "eventCreateFail",
        payload: error.response.data.message,
      });
    } else if (error.message) {
      // Handle other errors (e.g., network issues or Axios configuration errors)
      dispatch({
        type: "eventCreateFail",
        payload: error.message,
      });
    } else {
      // Fallback error handling
      dispatch({
        type: "eventCreateFail",
        payload: "An unknown error occurred.",
      });
    }
  }
};


// get All events of a shop
export const getAllEventsShop = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "getAlleventsShopRequest",
            
        })
        const {data} = await axios.get(`${server}/event/get-all-events/${id}`)
        dispatch({
            type:"getAlleventsShopSuccess",
            payload: data.events,
        });
    } catch (error) {
        dispatch({
            type: "getAlleventsShopFailed",
            payload: error.response.data.message,
        });
    }
}

// // delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteeventRequest",
      });
  
      const { data } = await axios.delete(`${server}/event/delete-shop-event/${id}`, {
        withCredentials: true,
      });
  
      dispatch({
        type: "deleteeventSuccess",
        payload: data.message,
      });
    } catch (error) {
      if (error.name === "AxiosError" && error.code === "ECONNABORTED") {
        // Request was aborted due to timeout or other reasons
        dispatch({
          type: "deleteeventFailed",
          payload: "Request aborted. Please check your internet connection and try again.",
        });
      } else if (error.response && error.response.data && error.response.data.message) {
        // Handle Axios error with response data
        dispatch({
          type: "deleteeventFailed",
          payload: error.response.data.message,
        });
      } else {
        // Handle other types of errors
        dispatch({
          type: "deleteeventFailed",
          payload: "An error occurred while deleting the event.",
        });
      }
    }
  };
  
  //  get All events
  export const getAllEvents = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAlleventsRequest",
      });

      const {data} = await axios.get(`${server}/event/get-all-events`);
      dispatch({
        type: "getAlleventsSuccess",
        payload: data.events,
      });
    } catch (error) {
      dispatch({
        type: "getAlleventsFailed",
        payload: error.response.data.message,
      });
    }
  }