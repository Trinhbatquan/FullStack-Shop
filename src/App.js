import "./App.css";

import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  ScreenCart,
  Login,
  NotFound,
  OrderScreen,
  PaymentMethod,
  ProfileScreen,
  DetailProduct,
  HomeScreen,
  Register,
  DeliveryAddress,
  PlaceOrderScreen,
} from "./screens";


import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: process.env.REACT_APP_APIKEY,

  authDomain: process.env.REACT_APP_DOMAIN,

  projectId: "fullstack-shop-a4c7e",

  storageBucket: "fullstack-shop-a4c7e.appspot.com",

  messagingSenderId: "467052879807",

  appId: "1:467052879807:web:9b517d4d3124c0614e0b0a"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/:pageNumber" element={<HomeScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="*" element={<NotFound />} />
          <Route path="products/:id" element={<DetailProduct />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="cart/:id?" element={<ScreenCart />} />
          <Route path="deliveryAddress" element={<DeliveryAddress />} />
          <Route path="paymentMethod" element={<PaymentMethod />} />
          <Route path="order/:id?" element={<OrderScreen />} />
          <Route path="placeOrder" element={<PlaceOrderScreen />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
