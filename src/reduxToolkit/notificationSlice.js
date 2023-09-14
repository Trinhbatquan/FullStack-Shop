import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const localNotifications = JSON.parse(
  localStorage.getItem("fullstack-shop-notification")
);

const initialState = {
  totalNotification: 0,
  readNotification: localNotifications || [],
};

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    addOneReadNotification: (state, action) => {
      let readNotifications = current(state).readNotification;
      readNotifications.push(action.payload);

      localStorage.setItem(
        "fullstack-shop-notification",
        JSON.stringify(readNotifications)
      );
      return {
        ...current(state),
        readNotification: readNotifications,
      };
    },
    addAllReadNotification: (state, action) => {
      localStorage.setItem(
        "fullstack-shop-notification",
        JSON.stringify(action.payload)
      );
      return {
        ...current(state),
        readNotification: action.payload,
      };
    },
    saveTotalNotification: (state, action) => {
      let count = current(state).totalNotification;
      count = action.payload;
      return {
        ...current(state),
        totalNotification: count,
      };
    },
  },
});

const { reducer, actions } = notificationSlice;
export const {
  addOneReadNotification,
  addAllReadNotification,
  saveTotalNotification,
} = actions;
export default reducer;
