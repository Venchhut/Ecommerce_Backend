import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { Op, where } from "sequelize";

// ! Get all products
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [["id", "DESC"]],
    });
    const count = await Product.count();
    res.status(200).json({ count, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ! Create a new product
const createProduct = async (req, res) => {
  try {
    const { title, Desc, image, price, quantity, CategoryId } = req.body;
    console.log(req.body);
    // check if category exist
    const category = await Category.findByPk(CategoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const product = await Product.create({
      title,
      Desc,
      price,
      image,
      quantity,
      CategoryId,
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ! Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, Desc, image, price, quantity, CategoryId } = req.body;
    console.log(req.body);
    await Product.update(
      { title, Desc, image, price, quantity, CategoryId },
      { where: { id } }
    );
    res.status(200).json("Update successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ! delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({
      where: { id },
    });
    res.status(200).json("delete succecss!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ! get product by ID
const productDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.quantity === "0") {
      return res
        .status(200)
        .json({ message: "This product is out of stock", product });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ! get product by Category

const product = async (req, res) => {
  try {
    const CategoryId = req.params.id;
    // Find the category by ID and include its associated products
    const category = await Category.findByPk(CategoryId, {
      include: Product,
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    // Return the category along with its associated products
    res.status(200).json(category); // Assuming your association uses "Products" as the accessor
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productDetail,
  product,
};
