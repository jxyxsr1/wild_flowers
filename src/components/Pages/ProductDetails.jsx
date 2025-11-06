import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import imageMap from "../../assets/imageMap"; // Import shared map
import fallbackImage from "../../assets/skincare_main.jpg"; // Fallback image

const reviewsData = {
  "Matte Lipstick": [
    { name: "Aanya", rating: 5, comment: "Great pigment and smooth application!" },
  ],
};

const ProductDetails = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const allProducts = snapshot.docs.map(doc => doc.data());

        const matched = allProducts.find(
          p => p.name?.toLowerCase().replace(/\s+/g, "-") === productSlug
        );

        if (matched) {
          matched.image = imageMap[matched.name] || matched.image || fallbackImage;
          setProduct(matched);
        } else {
          setProduct(false);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(false);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  if (loading) return <div className="mt-24 px-6 text-center text-pink-600">Loading...</div>;
  if (!product) return <div className="mt-24 px-6 text-center text-pink-600">— Product not found —</div>;

  const price = typeof product.price === "string" ? parseFloat(product.price.replace("₹", "")) : product.price;
  const discount = product.discount || 0;
  const discountedPrice = discount ? (price - (price * discount) / 100).toFixed(2) : price;

  const reviews = reviewsData[product.name] || [];

  const handleAddToCart = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to add items to cart.");
      return;
    }

    try {
      const cartRef = collection(db, "users", user.uid, "cart");
      const existing = await getDocs(cartRef);
      const newDocId = `Add to cart ${existing.size + 1}`;
      const newDocRef = doc(cartRef, newDocId);

      await setDoc(newDocRef, {
        name: product.name,
        price: Number(price),
        quantity,
        image: product.image,
        description: product.description || "",
        addedAt: new Date(),
      });

      navigate("/review", { state: { product, quantity } });
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Failed to add to cart.");
    }
  };

  return (
    <div className="mt-24 px-6">
      {/* PRODUCT INFO */}
      <div className="flex flex-wrap gap-8 max-w-5xl mx-auto items-center">
        <div className="w-80 h-80 border-2 border-pink-300 rounded-lg bg-pink-50 flex items-center justify-center overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-xl font-semibold text-green-600 mb-2">₹{discountedPrice}</p>
          <p className="text-gray-700 mb-2">{product.description}</p>
          {discount > 0 && <p className="text-orange-600">Discount: {discount}%</p>}
          <p>Rating: ★ {product.rating}</p>
          <p className="text-gray-500">Category: {product.category}</p>

          <div className="flex items-center gap-4 my-4">
            <button onClick={() => setQuantity(q => Math.max(q - 1, 1))} className="px-4 py-1 bg-gray-200 border rounded">−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-1 bg-gray-200 border rounded">+</button>
          </div>

          <div className="flex gap-4">
            <button onClick={handleAddToCart} className="px-6 py-2 bg-black text-white rounded">Add to Cart</button>
            <button onClick={() => navigate("/BuyNow", { state: { product } })} className="px-6 py-2 bg-pink-500 text-white rounded">Buy Now</button>
          </div>
        </div>
      </div>

      {/* PRODUCT DESCRIPTION + STATIC REVIEWS */}
<div className="max-w-4xl mx-auto mt-12 leading-7">
  <h3 className="text-xl text-pink-600 font-bold mb-4">Product Description</h3>
  <p className="text-gray-700">{product.longDescription || "No extended description available."}</p>
  <ul className="list-disc pl-6 mt-4 text-gray-600">
    <li>Safe and suitable for all skin types</li>
    <li>Infused with high-quality natural ingredients</li>
    <li>Dermatologist-tested and cruelty-free</li>
  </ul>
  <p className="mt-4 text-gray-500">
    Experience the confidence of refreshed skin with our professional skincare and makeup range.
  </p>

  {/* STATIC CUSTOMER REVIEWS */}
  <div className="mt-12 space-y-6 mb-20">
    <h3 className="text-xl font-bold text-pink-600 mb-4 text-center">Customer Reviews</h3>

    {/* Review 1 */}
    <div className="bg-white rounded-xl shadow-md p-5 border border-pink-200">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-md font-semibold text-pink-500">Riya</h4>
        <span className="text-yellow-500 font-medium">★ 5.0</span>
      </div>
      <p className="text-gray-700">Absolutely love this product! My skin feels soft and radiant. Definitely buying again.</p>
    </div>

    {/* Review 2 */}
    <div className="bg-white rounded-xl shadow-md p-5 border border-pink-200">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-md font-semibold text-pink-500">Aarav</h4>
        <span className="text-yellow-500 font-medium">★ 4.5</span>
      </div>
      <p className="text-gray-700">Noticeable difference after just a few uses. Packaging was also neat and clean.</p>
    </div>

    {/* Review 3 */}
    <div className="bg-white rounded-xl shadow-md p-5 border border-pink-200">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-md font-semibold text-pink-500">Meera</h4>
        <span className="text-yellow-500 font-medium">★ 4.8</span>
      </div>
      <p className="text-gray-700">Feels premium and lightweight on skin. Loved the subtle fragrance!</p>
    </div>
  </div>
</div>

      
    </div>
  );
};

export default ProductDetails;
