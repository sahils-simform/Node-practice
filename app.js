/* eslint-disable no-console */
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");

require("dotenv").config();

const port = process.env.PORT || 3000;
const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

app.use((req, res, next) => {
  User.findById("647f02e552f947ea35c9e96c")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log("User error", err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then(() => {
    console.log("connected");
    User.findOne().then((user) => {
      if (!user) {
        const user1 = new User({
          name: "Sahil",
          email: "Sahil@test.com",
          cart: {
            items: [],
          },
        });
        user1.save();
      }
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

// Product.belongsTo(User, { constraints: true, ondelete: 'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem});
// Product.belongsToMany(Cart, { through: CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem});

// sequelize
//     // .sync({ force: true })
//     .sync()
//     .then(() => {
//         User.findByPk(1);
//         // console.log(result);
//     })
//     .then(user => {
//         if(!user) {
//             User.create({ name:'Max', email: 'test@test.com'});
//         }
//     })
//     .then(() => {
//         app.listen(5000);

//     })
//     .catch(err => {
//         console.log(err);
//     })
