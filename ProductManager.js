class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id) || null;
  }

  addProduct(product) {
    const { name, description, price, stock } = product;

    if (!name || !description || !price || !stock) {
      return { error: "All fields are required" };
    }

    const newProduct = {
      id: this.nextId++,
      name,
      description,
      price,
      stock
    };

    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id, data) {
    const product = this.getProductById(id);
    if (!product) return null;

    Object.assign(product, data);
    return product;
  }

  deleteProductById(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);
    return true;
  }
}

module.exports = ProductManager;
