const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

router.get("/product", adminController.getAddProduct);

router.get("/products", adminController.getProducts);

router.post("/product", adminController.postAddProduct);

router.get("/product/:productId", adminController.getEditProduct);

router.put("/product", adminController.postEditProduct);

router.delete("/product", adminController.postDeleteProduct);

router.get("/cart", adminController.getCart);

router.post("/cart", adminController.postCart);

router.delete("/cart", adminController.postCartDeleteProduct);

router.post("/order", adminController.postOrder);

router.get("/orders", adminController.getOrders);

module.exports = router;
