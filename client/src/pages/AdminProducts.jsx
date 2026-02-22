import { useEffect, useState } from "react";
import api from "../api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    images: "",
    price: "",
    category: "",
    description: "",
    countInStock: "",
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // LOAD PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await api.get("/api/products");
    setProducts(data);
  };

  // CREATE PRODUCT
  const createProduct = async () => {
    await api.post("/api/products",
      {
        ...form,
        images: form.images.split(","),
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    setForm({
      name: "",
      images: "",
      price: "",
      category: "",
      description: "",
      countInStock: "",
    });

    fetchProducts();
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    await api.delete(`/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    fetchProducts();
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Products</h1>

      {/* CREATE FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 space-y-3">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input"
        />

        <input
          placeholder="Images (comma separated URLs)"
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
          className="input"
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="input"
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="input"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="input"
        />

        <input
          placeholder="Stock"
          value={form.countInStock}
          onChange={(e) =>
            setForm({ ...form, countInStock: e.target.value })
          }
          className="input"
        />

        <button
          onClick={createProduct}
          className="bg-green-700 text-white px-6 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="grid md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-xl bg-gray-50"
          >
            <p className="font-semibold">{product.name}</p>
            <p>₹{product.price}</p>
            <p>{product.category}</p>

            <button
              onClick={() => deleteProduct(product._id)}
              className="mt-3 text-red-600 underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
