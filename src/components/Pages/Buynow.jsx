import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import hydrationTherapy from "../../assets/hydration_therapy.jpg";
import Confetti from "react-confetti";
import { AiFillCheckCircle } from "react-icons/ai";

const BuyNow = () => {
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [hasSoundPlayed, setHasSoundPlayed] = useState(false);

  const product = location.state?.product;
  const quantity = location.state?.quantity || 1;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
      else navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setPopupVisible(false);
        navigate(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navigate]);

  useEffect(() => {
    if (isPopupVisible && !hasSoundPlayed) {
      const audio = new Audio("/sounds/success.mp3"); // ✅ Place your audio in public/sounds/
      audio.play();
      setHasSoundPlayed(true);
    }
  }, [isPopupVisible, hasSoundPlayed]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const productName = product?.name || "Hydration Therapy";
      const productPrice = product?.price || 500;

      const ordersRef = collection(db, "users", currentUser.uid, "buy now");
      const existingOrdersSnapshot = await getDocs(ordersRef);
      const productOrdersCount = existingOrdersSnapshot.docs.filter(doc =>
        doc.id.startsWith(`Buy Now - ${productName}`)
      ).length;

      const customDocId = `Buy Now - ${productName} ${productOrdersCount + 1}`;

      await setDoc(doc(db, "users", currentUser.uid, "buy now", customDocId), {
        product: productName,
        price: productPrice,
        quantity,
        address,
        paymentMethod,
        orderedAt: new Date()
      });

      const message = `Hi, I just placed an order:\n\nProduct: ${productName}\nQuantity: ${quantity}\nPrice: ₹${productPrice}\nPayment Method: ${paymentMethod}\n\nName: ${address.name}\nAddress: ${address.street}, ${address.city}, ${address.state} - ${address.zip}\nPhone: ${address.phone}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/7708751708?text=${encodedMessage}`, "_blank");

      setPopupVisible(true);
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8 font-sans mt-20">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">Buy Now</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Card */}
          <div className="w-full md:w-1/2">
            <img
              src={product?.image || hydrationTherapy}
              alt={product?.name || "Hydration Therapy"}
              className="w-full h-64 object-cover rounded-lg border"
            />
            <h3 className="text-xl mt-4 font-semibold text-pink-700">{product?.name || "Hydration Therapy"}</h3>
            <p className="text-gray-700">Category: {product?.category || "Moisturizer"}</p>
            <p className="text-lg font-semibold text-pink-600 mt-2">₹{product?.price || 500}</p>
            <p className="text-yellow-500">⭐ {product?.rating || 4.8}</p>
          </div>

          {/* Address + Payment Form */}
          <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-4">
            <h4 className="text-lg font-semibold text-gray-700">Delivery Address</h4>
            <input name="name" placeholder="Full Name" value={address.name} onChange={handleChange} required className="w-full p-2 border rounded" />
            <input name="street" placeholder="Street Address" value={address.street} onChange={handleChange} required className="w-full p-2 border rounded" />
            <input name="city" placeholder="City" value={address.city} onChange={handleChange} required className="w-full p-2 border rounded" />
            <input name="state" placeholder="State" value={address.state} onChange={handleChange} required className="w-full p-2 border rounded" />
            <input name="zip" placeholder="ZIP Code" value={address.zip} onChange={handleChange} required className="w-full p-2 border rounded" />
            <input name="phone" placeholder="WhatsApp Number" value={address.phone} onChange={handleChange} required className="w-full p-2 border rounded" />

            <h4 className="text-lg font-semibold text-gray-700 mt-6">Payment Method</h4>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="Online" checked={paymentMethod === "Online"} onChange={(e) => setPaymentMethod(e.target.value)} />
                Online
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} />
                Cash on Delivery
              </label>
            </div>

            <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded">
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>

      {/* Order Confirmation Popup */}
      {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg text-center animate-fadeIn">
            <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} />
            <div className="mb-4">
              <AiFillCheckCircle size={100} color="#4CAF50" />
            </div>
            <h3 className="text-2xl font-bold text-green-500 mb-4">Order Confirmed!</h3>
            <p className="text-lg">Your order has been successfully placed.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyNow;
