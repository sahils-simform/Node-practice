/* eslint-disable no-console */
const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
}

exports.postAddProduct = (req, res) => {
    const {title} = req.body;
    const {imageUrl} = req.body;
    const {price} = req.body;
    const {description} = req.body;
    const product = new Product(null, title, imageUrl, price, description);
    product
        .save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
}

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    if(!editMode) {
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product) {
            res.redirect('/');   
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product
        });
    });
};

exports.postEditProduct = (req,res) => {
    const prodId = req.body.productId;
    const upadatedTitle = req.body.title;
    const upadatedPrice = req.body.price;
    const upadatedImageUrl = req.body.imageUrl;
    const upadatedDesc = req.body.description;
    const upadatedProduct = new Product(
        prodId, 
        upadatedTitle, 
        upadatedPrice, 
        upadatedImageUrl, 
        upadatedDesc
    );
    console.log(upadatedProduct);
    upadatedProduct.save();
    res.redirect('/admin/products');
}

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};

exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};