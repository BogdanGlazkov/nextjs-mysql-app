import { query } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const products = await query({
      query: "SELECT * FROM products",
      values: [],
    });
    res.status(200).json({ products });
  }

  if (req.method === "POST") {
    const productName = req.body.product_name;
    let message;
    const addProduct = await query({
      query: "INSERT INTO products (product_name) VALUES(?)",
      values: [productName],
    });
    if (addProduct.insertId) {
      message = "success";
    } else {
      message = "error";
    }
    const newProduct = {
      product_id: addProduct.insertId,
      product_name: productName,
    };
    res.status(201).json({ response: { message, newProduct } });
  }
}
