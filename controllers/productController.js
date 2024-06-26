import Product from "../models/Product.js";

const getAllProducts = async (req, res) => {
  const products = await Product.find().populate("category");
  res.json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("category");
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  res.json(product);
};
const createProduct = async (req, res) => {
  const { name, price, category, description, stock } = req.body;

  const product = new Product({
    name,
    price,
    category,
    description,
    stock,
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createMultipleProducts = async (req, res) => {
  const products = req.body;
  try {
    const savedProducts = await Product.insertMany(products);
    res.status(201).json(savedProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, description, stock } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.description = description || product.description;
    product.stock = stock || product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    await product.remove();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  getAllProducts,
  getProduct,
  createProduct,
  createMultipleProducts,
  updateProduct,
  deleteProduct,
};
