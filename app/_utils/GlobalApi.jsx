const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((response) => {
    return response.data.data;
  });

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((response) => {
    return response.data.data;
  });

const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((response) => {
    return response.data.data;
  });

const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((response) => {
      return response.data.data;
    });

const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username,
    email,
    password,
  });

const signIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItems = (userId, jwt) =>
  axiosClient
    .get(
      `/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate][0]=url`,
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;

      const cartItemList = data.map((item, index) => ({
        name: item.attributes.products.data.attributes.name,
        quantity: item.attributes.quantity,
        amount: parseInt(item.attributes.amount),
        image:
          item.attributes.products.data.attributes.images.data[0].attributes
            .url,
        actualPrice: item.attributes.products.data.attributes.mrp,
        id: item.id,
        product: item.attributes.products.data.id,
      }));
      return cartItemList;
    });

const deleteCartItem = (id, jwt) =>
  axiosClient.delete(`/user-carts/${id}`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const createOrder = (data, jwt) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getMyOrder = (userId, jwt) =>
  axiosClient
    .get(
      `/orders?filters[userId][$eq]=${userId}&populate[orderItemList][populate][product][populate][images]=url`
    )
    .then((resp) => {
      const response = resp.data.data;
      const orderList = response.map((item) => ({
        id: item.id,
        totalOrderAmount: item.attributes.totalOrderAmt,
        paymentId: item.attributes.paymentId,
        orderItemList: item.attributes.orderItemList,
        createdAt: item.attributes.createdAt,
        status: item.attributes.Status,
      }));

      return orderList;
    });

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  signIn,
  addToCart,
  getCartItems,
  deleteCartItem,
  createOrder,
  getMyOrder,
};
