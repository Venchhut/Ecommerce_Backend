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
    const { title, Desc, price, quantity, CategoryId } = req.body;
    console.log(req.body);
    // check if category exist
    const category = await Category.findByPk(CategoryId);
    let image = null;
    if (req.file) {
      const localhost = "http://localhost:8800/";
      image = localhost + req.file.filename;
    }
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
    const { title, Desc, price, quantity, CategoryId } = req.body;
    let image = null;

    if (req.file) {
      const localhost = "http://localhost:8800/";
      image = localhost + req.file.filename;
    }

    // Fetch the existing product
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the product fields
    product.title = title || product.title;
    product.Desc = Desc || product.Desc;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.CategoryId = CategoryId || product.CategoryId;
    if (image) {
      product.image = image;
    }

    // Save the updated product
    await product.save();

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, details: err.errors });
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
//! search product

const searchProducts = async (req, res) => {
  const { query } = req.query;
  console.log(`Received query: ${query}`); // Log the received query

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const products = await Product.findAll({
      where: {
        title: {
          [Op.like]: `%${query}%`,
        },
      },
    });
    console.log(`Found products: ${products.length}`);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json({ products });
  } catch (error) {
    console.error(error); // Log any errors
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
  searchProducts,
};
