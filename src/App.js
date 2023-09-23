import "./App.css";

import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import {
  ScreenCart,
  Login,
  NotFound,
  OrderScreen,
  ProfileScreen,
  DetailProduct,
  HomeScreen,
  Register,
  DeliveryAddress,
  PlaceOrderScreen,
  EmailIdentify,
  ForgetPassword,
  UpdatePassword,
  Inform,
  Support,
  Favorite,
  Notification,
} from "./screens";

import { BsArrowUpCircleFill } from "react-icons/bs";

import FindBySearch from "screens/FindBySearch";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS25GmA2uMDcO2nGnsH6BfGPWq5kv3bNo",
  authDomain: "fullstack-shop-621c2.firebaseapp.com",
  projectId: "fullstack-shop-621c2",
  storageBucket: "fullstack-shop-621c2.appspot.com",
  messagingSenderId: "406344348934",
  appId: "1:406344348934:web:f2a9d7dbd2dd79612b5a87",
  measurementId: "G-MXF2WD1SJR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [appearScrollTop, setAppearScrollTop] = useState(false);

  let handleScroll = (state) => {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      if (!state) {
        setAppearScrollTop(true);
      }
    } else {
      if (state) {
        setAppearScrollTop(false);
      }
    }
  };
  useEffect(() => {
    function test(state) {
      //state ở đây luôn là state mới nhất mỗi khi được gọi do đã truyền vào trong [] của useEffect
      window.addEventListener("scroll", () => handleScroll(state));
    }

    test(appearScrollTop); //truyền đối số khi gọi hàm thì đối số này luôn luôn thay đổi mỗi khi được
    //gọi và xoá đi khi hàm kết thúc
    return () => window.removeEventListener("scroll", handleScroll);
    //handleScroll được gọi mà không truyền gì vào thì nếu ở định nghĩa trên nếu tham chiếu đến
    //1 biến ở bên ngoài thì nó chỉ tham chiếu lần gọi đầu tiên và những lần gọi sau sẽ lấy lại biến đó(
    //biến được lưu vào 1 ô nhớ trong heap memory
  }, [appearScrollTop]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // setAppearScrollTop(false);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/users/:email/verify/:token"
            element={<EmailIdentify />}
          />

          <Route
            path="/update/:email/password/:token"
            element={<UpdatePassword />}
          />

          <Route path="/forgetPassword" element={<ForgetPassword />} />

          {/* <Route path="/:pageNumber" element={<HomeScreen />} /> */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search?" element={<FindBySearch />} />
          {/* <Route path="*" element={<Navigate to="/:" replace />} /> */}
          <Route path="*" element={<NotFound />} />
          <Route path="products/:id" element={<DetailProduct />} />
          <Route path="login?" element={<Login />} />
          <Route path="forgetPassword?" element={<ForgetPassword />} />
          <Route path="register?" element={<Register />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="cart/:id?" element={<ScreenCart />} />
          <Route path="deliveryAddress" element={<DeliveryAddress />} />
          <Route path="order/:id?" element={<OrderScreen />} />
          <Route path="checkout" element={<PlaceOrderScreen />} />
          <Route path="inform" element={<Inform />} />
          <Route path="connect" element={<Support />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="notification" element={<Notification />} />
        </Routes>
      </Router>
      {appearScrollTop && (
        <BsArrowUpCircleFill
          className="fixed bottom-6 right-3 text-3xl cursor-pointer
        text-gray-500"
          onClick={handleScrollTop}
        ></BsArrowUpCircleFill>
      )}
    </div>
  );
}

export default App;

/*
Hàm k dc truyền => hàm closure => quan tâm đến biến mà định nghĩa hàm tham chiếu đến,
nếu biến đó không thay đổi (biến bên ngoài phải là let và bên trong phải ++bien, --bien, bien -=bien,..)
thì mãi mãi nhứng lần gọi sau biến vẫn nguyên giá trị.
Ví dụ:
setInterval (() => setState(state-1), 1000) //không được gán, chỉ trừ đi => lưu vào heap memory vs giá trị k đổi
cứ 1s , call back được gọi mà callback là 1 hàm không được truyền gì => nó là closure nếu truy
cập đến biến biên ngoài. Đúng vậy, setState là 1 hàm được truyền bình thường nên biến state trong hàm
là được cập nhật thường xuyên và bị xoá khi hàm kết thúc, nhưng state ở đây trong hàm không khởi tạo nên
nó tạo tham chiếu trỏ ra ngoài setInterval lấy state bên ngoài và lưu nó vào heap. Nhưng biến này
không được update mà chỉ truyền vào làm đối số của hàm con nên cứ lần gọi sau, state không thay đổi vì
lấy giá trị trong heap.

setInterval (() => setState((state) => state - 1), 1000) //được gán + lưu
ở đây lại khác, callback trong setState là 1 hàm bình thường. Vậy state trong hàm callback này
lấy ở đâu. Nhớ, hàm bình thường thì quan tâm đến giá trị truyền vào lúc gọi hàm. NHư vậy,
state ở đâu được truyền khi setState gọi hàm này và truyền cho nó giá trị mới nhất của state.

Mất cả một ngày để hiếu hết về closure, đúng là lý thuyết chỉ mãi mãi là lý thuyết.




*/
