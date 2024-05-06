import Address from "./Address";
import Cart from "./Cart";
import Category from "./Category";
import Feedback from "./Feedback";
import Order from "./Order";
import Payment from "./Payment";
import Product from "./Product";
import TrackingDetail from "./TrackingDetail";
import User from "./User";
import Wishlist from "./Wishlist";

const Relationship = () => {
  User.hasMany(Address);
  Address.belongsTo(User);

  User.hasMany(Payment);
  Payment.belongsTo(User);

  User.hasMany(Feedback);
  Feedback.belongsTo(User);

  User.hasMany(Order);
  Order.belongsTo(User);

  Order.hasMany(Product);
  Product.belongsTo(Order);

  Order.hasMany(Payment);
  Payment.belongsTo(Order);

  Order.hasMany(TrackingDetail);
  TrackingDetail.belongsTo(Order);

  Product.hasMany(Feedback);
  Feedback.belongsTo(Product);

  Category.hasMany(Product);
  Product.belongsTo(Category);

  Product.hasMany(Wishlist);
  Wishlist.belongsTo(Product);

  User.hasMany(Wishlist);
  Wishlist.belongsTo(User);

  Cart.hasMany(Product);
  Product.belongsTo(Cart);

  Cart.hasOne(User);
  User.belongsTo(Cart);
};
export default Relationship;
