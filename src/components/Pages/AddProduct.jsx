import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Make sure this path is correct

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "",
    price: "",
    discount: "",
    rating: "",
    badge: "",
    imageUrl: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        discount: formData.discount ? Number(formData.discount) : 0,
        rating: Number(formData.rating),
      };

      await addDoc(collection(db, "products"), productData);
      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        longDescription: "",
        category: "",
        price: "",
        discount: "",
        rating: "",
        badge: "",
        imageUrl: "",
      });
    } catch (err) {
      setError("Failed to add product. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">Add New Product</h2>

      {success && <p className="text-green-600 mb-4">✅ Product added successfully!</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Title", name: "title" },
          { label: "Short Description", name: "description" },
          { label: "Long Description", name: "longDescription" },
          { label: "Category", name: "category" },
          { label: "Price", name: "price", type: "number" },
          { label: "Discount (%)", name: "discount", type: "number" },
          { label: "Rating", name: "rating", type: "number" },
          { label: "Badge", name: "badge" },
          { label: "Image URL", name: "imageUrl" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block font-medium text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required={name !== "badge" && name !== "discount"}
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
