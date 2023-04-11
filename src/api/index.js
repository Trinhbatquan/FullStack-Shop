import axios from "axios";

const baseUrl = "https://full-stack-shop-git-backend-trinhbatquan.vercel.app/";

export const getAllProducts = async (pageNumber = "") => {
  try {
    const allProducts = await axios.get(`${baseUrl}api/products?pageNumber=${pageNumber}`);
    if (allProducts) {
      return allProducts.data;
    }
  } catch (error) {
    console.log("allProducts" + error);
  }
};

export const getProductById = async (id) => {
  try {
    const product = await axios.get(`${baseUrl}api/products/${id}`);
    if (product) {
      return product.data;
    }
  } catch (error) {
    console.log("product" + error);
  }
};

//user api
export const loginUser = async (email, password) => {
  console.log(email, password)
  try {
    const user = await axios.post(`${baseUrl}api/users/login`, {
      email,
      password,
    });
    if (user && user.data.name) {
        return user.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("login" + error);
  }
};
export const registerUser = async (name, email, password) => {
  try {
    const user = await axios.post(`${baseUrl}api/users/register`, {

      name,
      email,
      password,
      
    });
    if (user && user.data.name) {
        return user.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("register" + error);
  }
};

export const profileUser = async () => {
  const token = JSON.parse(localStorage.getItem('userShop')).token;
  console.log(token)
  try {
    const user = await axios.get(`${baseUrl}api/users/profile`, {

      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (user && user.data.name) {
        return user.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("profile" + error);
  }
};


export const updateProfileUser = async (name, email, password) => {
  const token = JSON.parse(localStorage.getItem('userShop')).token;
  console.log(token)
  try {
    const user = await axios.put(`${baseUrl}api/users/updateProfile`, 
    {
      name,
     email,
     password
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    },
    
    );
    if (user && user.data.name) {
        return user.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("updateProfile" + error);
  }
};


//order
export const createNewOrder = async (order) => {
  const token = JSON.parse(localStorage.getItem('userShop')).token;
  try {
    const newOrder = await axios.post(`${baseUrl}api/orders/newOrder`, {
        ...order
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    
    );
    if (newOrder && newOrder.data.orderItems) {
        return newOrder.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("order" + error);
  }
};

//get Order by id
export const orderById = async (id) => {
  const token = JSON.parse(localStorage.getItem('userShop')).token;
  try {
    const orderId = await axios.get(`${baseUrl}api/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    
    );
    if (orderId && orderId.data.orderItems) {
        return orderId.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("orderById" + error);
  }
};

//update order pay by id
export const updateOrderWhenPay = async (id, pay) => {
  const token = JSON.parse(localStorage.getItem('userShop')).token;
  try {
    const orderId = await axios.put(`${baseUrl}api/orders/${id}/pay`,
    {
      ...pay
    },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    
    );
    if (orderId && orderId.data.isPaid) {
        return orderId.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("updateOrderPay" + error);
  }
};

//order by user
export const ordersByUser = async () => {
  const token = JSON.parse(localStorage.getItem('userShop')).token;
  try {
    const ordersByUser = await axios.get(`${baseUrl}api/orders/`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    
    );
    if (ordersByUser && !ordersByUser.data.mess) {
        return ordersByUser.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("ordersByUser" + error);
  }
};




//review to product
export const createReview = async (id, review) => {
  const token = JSON.parse(localStorage.getItem('userShop')).token;
  try {
    const reviewProduct = await axios.post(`${baseUrl}api/products/${id}/review`, {
        ...review
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    
    );
    if (reviewProduct && reviewProduct.data.mess === "Add Review Successfully") {
        return reviewProduct.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("review" + error);
  }
};