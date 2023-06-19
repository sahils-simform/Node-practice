/* eslint-disable no-console */

const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Products", productSchema);

// const mongodb = require('mongodb');
// const {getDb} = require('../util/database');

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     const userId = this.id
//     console.log(userId);
//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     console.log("This is db -> ",db)
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(() => {
//         console.log('Deleted');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Product = sequelize.define('product', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imageUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

// const db = require('../util/database')

// // const fs = require('fs');
// // const path = require('path');

// // const Cart = require('./cart');

// // const pathFind = path.join(
// //     path.dirname(require.main.filename),
// //     'data',
// //     'products.json'
// // );

// // const getProductsFile = (cb) => {
// //     fs.readFile(pathFind, (err, fileContent) => {
// //         if(err) {
// //             cb([]);
// //         }
// //         else{
// //             cb(JSON.parse(fileContent));
// //         }
// //     });
// // }

// module.exports = class Product{
//     constructor(id, title, imageUrl, price, description){
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }

//     save() {
//         db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
//             [this.title, this.price, this.imageUrl, this.description]
//         );
//         // getProductsFile(products => {
//         //     if(this.id) {
//         //         const existingProductIndex = products.findIndex(prod => prod.id === this.id);
//         //         const updatedProducts = [...products];
//         //         updatedProducts[existingProductIndex] = this;
//         //         fs.writeFile(pathFind, JSON.stringify(updatedProducts), (err) => {
//         //             console.log(err);
//         //         });
//         //     } else {
//         //         this.id = Math.random().toString();
//         //         products.push(this);
//         //         fs.writeFile(pathFind, JSON.stringify(products), (err) => {
//         //             console.log(err);
//         //         });
//         //     };
//         // });
//     }

//     // static deleteById(id) {
//     //     getProductsFile(products => {
//     //         const product = products.find(prod => prod.id === id)
//     //         const updatedProducts = products.filter(prod => prod.id !== id)
//     //         fs.writeFile(pathFind, JSON.stringify(updatedProducts), err => {
//     //            if (!err) {
//     //             Cart.deleteProduct(id, product.price);
//     //            }
//     //         })
//     //     });
//     // }

//     static fetchAll(){
//         return db.execute('SELECT * FROM products');
//         // getProductsFile(cb);
//     }

//     static findById(id){
//         return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
//         // getProductsFile(products => {
//         //     const product = products.find(element=>element.id === id);
//         //     cb(product);
//         // });
//     }
// }
