import { where } from "sequelize";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
// ! create a new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    let image = null;
    if (req.file) {
      const localhost = "http://localhost:8800/";
      image = localhost + req.file.filename;
    }
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await Category.create({ name, image });
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ! get all categories
const categories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Controller to handle retrieving a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    // Return the category along with its associated products
    res.status(200).json(category); // Assuming your association uses "Products" as the accessor
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Controller to update an existing category
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    let image = null;
    if (req.file) {
      const localhost = "http://localhost:8800/";
      image = localhost + req.file.filename;
    }
    // Find the category by ID
    const category = await Category.findByPk(categoryId);

    // If category doesn't exist, return a 404 error
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Update the category with the new data
    category.name = name;
    category.image = image;

    // Save the updated category to the database
    await category.save();

    // Return the updated category
    res.status(200).json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export {
  createCategory,
  categories,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
