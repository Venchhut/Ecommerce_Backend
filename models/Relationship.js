import Address from "./Address.js";
import Cart from "./Cart.js";
import Category from "./Category.js";
import Feedback from "./Feedback.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Payment from "./Payment.js";
import Product from "./Product.js";
import TrackingDetail from "./TrackingDetail.js";
import User from "./User.js";
import Wishlist from "./Wishlist.js";

const Relationship = () => {
  User.hasMany(Address);
  Address.belongsTo(User);

  User.hasMany(Payment);
  Payment.belongsTo(User);

  User.hasMany(Feedback);
  Feedback.belongsTo(User);

  User.hasMany(Order);
  Order.belongsTo(User);

  // Product.hasMany(Order);
  // Order.belongsTo(Product);
  Order.hasMany(OrderItem);
  OrderItem.belongsTo(Order);

  Product.hasMany(OrderItem);
  OrderItem.belongsTo(Product);
  Order.hasMany(Payment);
  Payment.belongsTo(Order);

  Order.hasMany(TrackingDetail);
  TrackingDetail.belongsTo(Order);

  Product.hasMany(Feedback);
  Feedback.belongsTo(Product);

  // Cart.hasMany(Product);
  // Product.belongsTo(Cart);
  Product.hasMany(Cart);
  Cart.belongsTo(Product);

  // Cart.hasOne(User);
  // User.belongsTo(Cart);
  User.hasMany(Cart);
  Cart.belongsTo(User);

  Category.hasMany(Product);
  Product.belongsTo(Category);

  Product.hasMany(Wishlist);
  Wishlist.belongsTo(Product);

  User.hasMany(Wishlist);
  Wishlist.belongsTo(User);

  Address.hasMany(Order);
  Order.belongsTo(Address);
};
export default Relationship;
