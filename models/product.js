/* eslint-disable no-console */

const db = require('../util/database')

// const fs = require('fs');
// const path = require('path');

// const Cart = require('./cart');

// const pathFind = path.join(
//     path.dirname(require.main.filename), 
//     'data', 
//     'products.json'
// );

// const getProductsFile = (cb) => {
//     fs.readFile(pathFind, (err, fileContent) => {
//         if(err) {
//             cb([]);
//         }
//         else{
//             cb(JSON.parse(fileContent));
//         }
//     });
// }

module.exports = class Product{
    constructor(id, title, imageUrl, price, description){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', 
            [this.title, this.price, this.imageUrl, this.description]
        );
        // getProductsFile(products => {
        //     if(this.id) {
        //         const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        //         const updatedProducts = [...products];
        //         updatedProducts[existingProductIndex] = this;
        //         fs.writeFile(pathFind, JSON.stringify(updatedProducts), (err) => {
        //             console.log(err);
        //         });    
        //     } else {
        //         this.id = Math.random().toString();
        //         products.push(this);
        //         fs.writeFile(pathFind, JSON.stringify(products), (err) => {
        //             console.log(err);
        //         });
        //     };
        // });
    }

    // static deleteById(id) {
    //     getProductsFile(products => {
    //         const product = products.find(prod => prod.id === id)
    //         const updatedProducts = products.filter(prod => prod.id !== id)
    //         fs.writeFile(pathFind, JSON.stringify(updatedProducts), err => {
    //            if (!err) {
    //             Cart.deleteProduct(id, product.price);
    //            }
    //         })
    //     });
    // }

    static fetchAll(){
        return db.execute('SELECT * FROM products');
        // getProductsFile(cb);
    }

    static findById(id){
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
        // getProductsFile(products => {
        //     const product = products.find(element=>element.id === id);
        //     cb(product);
        // });
    }
}