const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const PORT = 3000;

app.use(express.json());

const manager = new ProductManager();

// GET
app.get("/api/products", (req, res) => {
  res.status(200).json(manager.getProducts());
});

app.get("/api/products/:id", (req, res) => {
  const product = manager.getProductById(Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.status(200).json(product);
});

// POST
app.post("/api/products", (req, res) => {
  const result = manager.addProduct(req.body);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.status(201).json(result);
});

// PUT
app.put("/api/products/:id", (req, res) => {
  const updated = manager.updateProduct(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: "Product not found" });
  res.status(200).json(updated);
});

// DELETE
app.delete("/api/products/:id", (req, res) => {
  const deleted = manager.deleteProductById(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Product not found" });
  res.status(200).json({ message: "Product deleted" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
