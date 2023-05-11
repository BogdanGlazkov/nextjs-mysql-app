import { query } from "@/lib/db";
import { rewrites } from "../../../next.config";

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

  if (req.method === "PUT") {
    const productId = req.body.product_id;
    const productName = req.body.product_name;
    let message;

    const updateProduct = await query({
      query: "UPDATE products SET product_name = ? WHERE product_id = ?",
      values: [productName, productId],
    });

    const result = updateProduct.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }

    const updatedProduct = {
      product_id: productId,
      product_name: productName,
    };
    res.status(200).json({ response: { message, updatedProduct } });
  }

  if (req.method === "Delete") {
    const productId = req.body.product_id;
    let message;

    const deleteProduct = await query({
      query: "DELETE FROM products WHERE product_id = ?",
      values: [productId],
    });

    const result = deleteProduct.affectedRows;
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    res.status(200).json({ response: { message, productId } });
  }
}
