import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import {  doc,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { getAuth } from "firebase/auth";

// Local images
import lipstickImg from "../../assets/lipstick.jpg";
import foundationImg from "../../assets/foundation.jpg";
import highlighterImg from "../../assets/highlighter.jpg";
import eyeshadowImg from "../../assets/eyeshadow.jpg";
import settingSprayImg from "../../assets/setting_spray.jpg";
import contourKitImg from "../../assets/contour_kit.jpg";
import falseLashesImg from "../../assets/false_lashes.jpg";
import makeupBrushesImg from "../../assets/makeup_brushes.jpg";

import makeupMainImg from "../../assets/makeup_main.jpg";
import partyMakeupImg from "../../assets/party_makeup.jpg";
import makeupTransformationImg from "../../assets/makeup_transformation.jpg";
import editorialMakeupImg from "../../assets/editorial_makeup.jpg";
import everydayMakeupImg from "../../assets/everyday_makeup.jpg";
import bridalMakeupImage from "../../assets/bridal makeup look.jpg";
import customer1 from "../../assets/customer1.jpg";
import customer2 from "../../assets/customer2.jpg";
import customer3 from "../../assets/customer3.jpg";
import customer4 from "../../assets/customer4.jpg";
import customer5 from "../../assets/customer5.jpg";
import customer6 from "../../assets/customer6.jpg";

// Image map to assign correct image to each product based on name
const imageMap = {
  "Matte Lipstick": lipstickImg,
  "Full-Coverage Foundation": foundationImg,
  "Glow Highlighter": highlighterImg,
  "Eyeshadow Palette": eyeshadowImg,
  "Setting Spray": settingSprayImg,
  "Contour Kit": contourKitImg,
  "False Lashes": falseLashesImg,
  "Makeup Brushes": makeupBrushesImg,
};

const Makeup = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});

 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetched = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((product) => product.category === "Makeup")
          .map((product) => ({
            ...product,
            image: imageMap[product.name] || "", // Match image by product name
          }));

        setProducts(fetched);
      } catch (err) {
        console.error("Error fetching makeup products:", err);
      }
    };

    fetchProducts();
  }, []);
  const toggleWishlist = async (index, product) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("Please log in to save to wishlist.");
    return;
  }

  setWishlist((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));

  const wishlistRef = collection(db, "users", user.uid, "wish list");

  const productId = product.name.trim().toLowerCase().replace(/\s+/g, "-");

  const productDocRef = doc(db, "users", user.uid, "wish list", productId);

  try {
    if (!wishlist[index]) {
      // ADD to wishlist
     await setDoc(productDocRef, {
  name: product.name || "",
  price: product.price || 0,
  rating: product.rating ?? 0,
  description: product.description || "",
  image: product.image || "",
  category: product.category || "",
});

    } else {
      // REMOVE from wishlist
      await deleteDoc(productDocRef);
    }
  } catch (error) {
    console.error("Error updating wishlist:", error);
  }
};

  return (
    <div className="bg-pink-100 min-h-screen">
      {/* Hero Section */}
      <div
        className="w-full h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${makeupMainImg})` }}
      ></div>

      <div className="text-center text-gray-700 italic text-xl py-8">
        "Makeup is art. Beauty is spirit. Confidence is everything."
      </div>

      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Exclusive Makeup Styles</h2>
      <div className="px-8 md:px-16 lg:px-24 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.img src={partyMakeupImg} alt="Party Makeup" className="w-full h-[500px] object-cover rounded-xl shadow-md" whileHover={{ scale: 1.03 }} />
          <motion.img src={makeupTransformationImg} alt="Makeup Transformation" className="w-full h-[500px] object-cover rounded-xl shadow-md" whileHover={{ scale: 1.03 }} />
          <motion.img src={editorialMakeupImg} alt="Editorial Makeup" className="w-full h-[500px] object-cover rounded-xl shadow-md" whileHover={{ scale: 1.03 }} />
        </div>
      </div>

      {/* Bridal Section */}
      <div className="w-full bg-white shadow-md py-14 px-8 md:px-20 flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="md:w-1/2">
          <h3 className="text-4xl font-semibold text-gray-900 mb-5">Party Makeup at Wildflower Salon</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            At <strong>Wildflower Salon</strong>, we believe every occasion deserves a touch of elegance and confidence...
          </p>
          <Link to="/book-appointment">
            <button className="mt-6 bg-pink-500 text-white px-7 py-3 rounded-xl text-lg hover:bg-pink-600 transition">
              Book Now
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <img src={everydayMakeupImg} alt="Party Makeup" className="w-full max-w-[650px] h-[480px] object-cover rounded-xl" />
        </div>
      </div>

      {/* Bridal Makeup */}
      <div className="container mx-auto flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg my-16 p-12 w-full h-[600px]">
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={bridalMakeupImage} alt="Bridal Makeup" className="w-[85%] h-[500px] object-cover rounded-2xl" />
        </div>
        <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left mt-6 md:mt-0">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">WEDDING MAKEUP at Wildflower Salon</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            We specialize in stunning bridal looks that enhance your beauty on your special day.
          </p>
          <Link to="/book-appointment">
            <button className="mt-6 bg-pink-500 text-white px-8 py-4 rounded-2xl text-xl hover:bg-pink-600 transition">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* Happy Customers */}
      <div className="px-8 md:px-16 lg:px-24 mb-14">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Happy Customers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[customer1, customer2, customer3, customer4, customer5, customer6].map((img, index) => (
            <div key={index} className="text-center">
              <motion.img src={img} alt={`Customer ${index + 1}`} className="w-full h-auto max-h-[600px] object-cover rounded-xl shadow-md" whileHover={{ scale: 1.03 }} />
              <p className="mt-4 text-lg text-gray-700 italic">"Loved the look! Wildflower made my day!"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Catalog */}
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">SHOP OUR COLLECTION</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Link to={`/products/${product.name?.toLowerCase().replace(/\s+/g, "-")}`} key={product.id || index}>
              <motion.div className="relative bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition duration-300" whileHover={{ scale: 1.02 }}>
                {product.tag && (
                  <div className="absolute top-4 left-4 bg-black text-white text-sm font-semibold px-3 py-1 shadow-lg">
                    {product.tag}
                  </div>
                )}
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-black font-bold text-lg">₹{product.price}</p>
                <div className="flex items-center mt-2">
                  <span className="text-gray-700 font-semibold">{product.rating}</span>
                  <span className="text-yellow-400 ml-2">★</span>
                </div>
                <motion.div
  className="absolute top-4 right-4 cursor-pointer"
  onClick={(e) => {
    e.preventDefault(); // prevent link navigation
    toggleWishlist(index, product);
  }}
>
  <FaHeart className={wishlist[index] ? "text-red-500" : "text-gray-400"} size={20} />
</motion.div>

              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Makeup;
