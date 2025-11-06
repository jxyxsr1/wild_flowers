import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import skincareMain from "../../assets/pink she.jpg";
import first from "../../assets/Add a heading.png";
import second from "../../assets/dermatalogist.jpg";
import third from "../../assets/ingrediants.jpg";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import imageMap from "../../assets/imageMap"; // shared image map
import skincareFallback from "../../assets/skincare_main.jpg"; // fallback
import { getAuth } from "firebase/auth";
import {  doc, setDoc, deleteDoc } from "firebase/firestore";
const Skincare = () => {
  const [wishlist, setWishlist] = useState({});
  const [skincareProducts, setSkincareProducts] = useState([]);

  useEffect(() => {
    const fetchSkincare = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const data = snapshot.docs.map(doc => doc.data());

        const filtered = data
          .filter(product =>
            product.category?.toLowerCase().includes("skincare") ||
            ["Moisturizer", "Toner", "Anti-Aging"].includes(product.category)
          )
         .map(product => ({
  ...product,
 image: imageMap[product.name?.trim()] || skincareFallback,
  slug: product.name.toLowerCase().replace(/\s+/g, "-")
}))

        setSkincareProducts(filtered);
      } catch (error) {
        console.error("Error fetching skincare products:", error);
      }
    };

    fetchSkincare();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "-translate-y-10");
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll(".fade-in-text");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
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
    <div className="bg-pink-50 min-h-screen font-sans text-gray-800">
      <div
        className="w-full h-[400px] md:h-[600px] lg:h-[700px] bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${skincareMain})` }}
      ></div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-pink-700 text-center mb-6">Skincare Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {skincareProducts.map((product, index) => {
            const price = typeof product.price === "string"
              ? parseFloat(product.price.replace("₹", ""))
              : parseFloat(product.price);
            const discount = product.discount || 0;
            const discountedPrice = discount
              ? price - (price * discount) / 100
              : price;

            return (
              <Link key={index} to={`/products/${product.slug}`}>
                <div className="relative bg-white p-4 rounded-2xl border border-pink-200 shadow-md transition-transform hover:scale-105">
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-pink-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                      {product.badge}
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[350px] object-cover rounded-xl mb-4"
                  />
                  <div className="text-center">
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
                      <button
  className="absolute top-2 right-2 cursor-pointer"
  onClick={(e) => {
    e.preventDefault(); // Prevent navigation if inside <Link>
    toggleWishlist(index, product); // Pass index and product
  }}
>
  <FaHeart
    className={wishlist[index] ? "text-red-500" : "text-gray-400"}
    size={20}
  />
</button>

                    </div>
                    <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-pink-500 font-bold">₹{discountedPrice}</p>
                      <span className="text-yellow-500 text-sm">⭐ {product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Banner */}
      <div className="w-full container mx-auto px-6 py-10">
        <img src={first} alt="Transformative Skincare Banner" className="rounded-xl shadow-lg w-full object-cover" />
      </div>

      {/* Info Sections */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between container mx-auto px-6 py-16 bg-white rounded-2xl shadow-md">
        <div className="md:w-[40%] mb-6 md:mb-0">
          <img src={second} alt="Dermatologically Tested" className="rounded-lg shadow-lg w-full h-[400px] object-cover" />
        </div>
        <div className="md:w-[55%] fade-in-text transition-all duration-1000 ease-in-out opacity-0 -translate-y-10">
          <h3 className="uppercase tracking-wide text-sm text-gray-500 mb-2">Suitable for Every Skin Type</h3>
          <h2 className="text-3xl font-bold text-pink-600 mb-4">Dermatologically Tested</h2>
          <p className="text-gray-600">Our skincare products are developed with precision and care, undergoing rigorous dermatological testing to ensure their safety and effectiveness. We recommend a patch test before regular use.</p>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between container mx-auto px-6 py-16 bg-white rounded-2xl shadow-md">
        <div className="md:w-[40%] mt-6 md:mt-0">
          <img src={third} alt="Ingredient Integrity" className="rounded-lg shadow-lg w-full h-[400px] object-cover" />
        </div>
        <div className="md:w-[55%] fade-in-text transition-all duration-1000 ease-in-out opacity-0 -translate-y-10">
          <h3 className="uppercase tracking-wide text-sm text-gray-500 mb-2">Sourced from the Natural Origin</h3>
          <h2 className="text-3xl font-bold text-pink-600 mb-4">Ingredient Integrity</h2>
          <p className="text-gray-600">We source ingredients that are potent, pure, and ethically obtained to ensure our products deliver great results without compromising on sustainability and values.</p>
        </div>
      </div>
    </div>
  );
};

export default Skincare;
