/* eslint-disable no-console */

const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

//
const getAddProduct = (req, res) => {
  res.status(200).json({
    status: "success",
    massage: "Add your product",
    isAuthenticated: req.isLoggedIn,
  });
};

const postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Product is created",
      });
    })
    .catch(() => {
      res.status(404).json({
        status: "failed",
        message: "Something is wrong",
      });
    });
};

const getEditProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((data) => {
      res.status(200).json({
        status: "success",
        massage: {
          product: data,
          isAuthenticated: req.isLoggedIn,
        },
      });
    })
    .catch(() => {
      res.status(404).json({
        status: "failed",
        message: "Something is Wrong",
      });
    });
};

const postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findById(prodId)
    .then((product) => {
      const dummyProduct = product;
      dummyProduct.title = updatedTitle;
      dummyProduct.price = updatedPrice;
      dummyProduct.description = updatedDesc;
      dummyProduct.imageUrl = updatedImageUrl;
      return dummyProduct.save();
    })
    .then(() => {
      res.status(200).json({
        status: "success",
        massage: "Product Data is Updated",
      });
    })
    .catch(() => {
      res.status(404).json({
        status: "failed",
        message: "Something is Wrong",
      });
    });
};

const getProducts = (req, res) => {
  Product.find()
    // .select("title price -_id")
    // .populate("userId", "name")
    .then((productsData) => {
      res.status(200).json({
        status: "success",
        massage: {
          products: productsData,
          isAuthenticated: req.isLoggedIn,
        },
      });
    })
    .catch(() => {
      res.status(404).json({
        status: "failed",
        message: "Something is Wrong",
      });
    });
};

const postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      res.status(200).json({
        status: "success",
        massage: "Product data is deleted",
      });
    })
    .catch(() => {
      res.status(404).json({
        status: "failed",
        message: "Something is Wrong",
      });
    });
};

const getCart = async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.product").execPopulate();
    const productsData = user.cart.items;

    res.status(200).json({
      status: "success",
      message: {
        products: productsData,
        isAuthenticated: req.isLoggedIn,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Something is wrong",
    });
  }
};

const postCart = async (req, res) => {
  try {
    const prodId = req.body.productId;
    const product = await Product.findById(prodId);
    const result = await User.addToCart(product);
    console.log(result);
    res.status(200).json({
      status: "success",
      massage: "Product is added in cart",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Something is Wrong",
    });
  }
};

const postCartDeleteProduct = async (req, res) => {
  try {
    const prodId = req.body.productId;
    await req.user.removeFromCart(prodId);

    res.status(200).json({
      status: "success",
      message: "Cart data is deleted",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

const postOrder = async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.productId").execPopulate();
    const products = user.cart.items.map((i) => ({
      quantity: i.quantity,
      product: { ...i.productId._doc },
    }));
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      product: products,
    });
    await order.save();
    await req.user.clearCart();

    res.status(200).json({
      status: "success",
      message: "Product is ordered successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Something is wrong",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const ordersData = await Order.find({ "user.userId": req.user._id });

    res.status(200).json({
      status: "success",
      message: {
        orders: ordersData,
        isAuthenticated: req.isLoggedIn,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Something is wrong",
    });
  }
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  getProducts,
  postDeleteProduct,
  getCart,
  postCart,
  postCartDeleteProduct,
  postOrder,
  getOrders,
};
