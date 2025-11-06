import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        alert("Please log in to view your wishlist.");
        return;
      }

      try {
        const wishlistRef = collection(db, "users", user.uid, "wish list");
        const snapshot = await getDocs(wishlistRef);

        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          slug: doc.data().name?.toLowerCase().replace(/\s+/g, "-"),
        }));

        setWishlistItems(items);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user]);

  return (
    <div className="bg-pink-50 min-h-screen py-8 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-pink-600 text-center mt-16">
        Your Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your wishlist is empty 💔
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product, index) => (
            <Link key={index} to={`/products/${product.slug}`}>
              <div className="bg-white p-4 rounded-2xl border border-pink-200 shadow hover:shadow-md transition duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[250px] object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-pink-500 font-bold">
                    ₹{product.price}
                  </span>
                  <span className="text-yellow-500 text-sm">
                    ⭐ {product.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
