import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { data } = await axios.post("/api/orders", order);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    document.location.href = `/order/${data._id}`;
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/orders/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
