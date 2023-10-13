import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";
import { combineReducers } from 'redux';

const persistConfig = {
  key: "root", // The key for storing the data in storage
  storage, // The storage method to use
};

const rootReducer = combineReducers(
  {
  user: userReducer,
  seller: sellerReducer,
  products: productReducer,
  events: eventReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
}
)

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
});

const persistor = persistStore(Store);

export { Store, persistor };
