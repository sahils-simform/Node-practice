/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const pathFind = path.join(path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(pathFind, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let upadatedProduct;
            // Add new product / increase quantity 
            if (existingProduct) {
                upadatedProduct = {...existingProduct};
                upadatedProduct.qty = + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = upadatedProduct;
            } else {
                upadatedProduct = {id, qty: 1};
                cart.products = [...cart.products, upadatedProduct];
            }
            cart.totalPrice = + +productPrice;
            fs.writeFile(pathFind, JSON.stringify(cart), () => console.log(err));
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(pathFind, (err, fileContent) => {
            if (err) {
                console.log(err);
            }
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => prod.id === id);
            
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            );
            updatedCart.totalPrice -= productPrice * productQty;
            fs.writeFile(pathFind, JSON.stringify(updatedCart), () => {console.log(err)});
        });
    }

    static getCart(cb) {
        fs.readFile(pathFind, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err) {
                cb(null);
            } else {
                cb(cart);
            }
        })
    }
}    