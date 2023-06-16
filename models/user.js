/* eslint-disable no-console */
const mongoose = require("mongoose");
// const { ObjectId } = require("mongodb");
// const { getDb } = require("../util/database");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
});

userSchema.methods.addToCart = (product) => {
  const cartProductIndex = this.cart.items.findIndex(
    (cp) => cp.productId.toString() === product._id.toString()
  );
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("Users", userSchema);

// const updatedCart = {
//   items: {
//     productId: product._id,
//     quantity: 1,
//   },
// };

// const db = getDb();
// return db
//   .collection("users")
//   .updateOne(
//     { _id: new ObjectId(this._id) },
//     { $set: { cart: { items: updatedCart } } }
//   );
// const {ObjectId} = mongodb;

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; // {items: []}
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map(i =>
//        i.productId
//     );
//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => products.map(p => ({
//             ...p,
//             quantity: this.cart.items.find(i =>
//               i.productId.toString() === p._id.toString()
//             ).quantity
//           })));
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(item =>
//        item.productId.toString() !== productId.toString()
//     );
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: {items: updatedCartItems} } }
//       );
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new ObjectId(userId) })
//       .then(user => {
//         console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = User;
