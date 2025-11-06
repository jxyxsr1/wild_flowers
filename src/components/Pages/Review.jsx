import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { FiTrash2 } from "react-icons/fi";

const Review = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCheckout, setIsCheckout] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Online");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!auth.currentUser) return;
      try {
        const cartRef = collection(db, "users", auth.currentUser.uid, "cart");
        const snapshot = await getDocs(cartRef);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(db, "users", auth.currentUser.uid, "cart", itemId));
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const orderId = `Order-${Date.now()}`;
      const total = calculateTotalPrice();

      // Save to Firestore
      await setDoc(doc(db, "users", currentUser.uid, "orders", orderId), {
        items: cartItems,
        total,
        address,
        paymentMethod,
        orderedAt: new Date(),
      });

      // Format WhatsApp message
      const message = `
📦 *New Order by ${address.name}*
----------------------------------
${cartItems
  .map(
    (item) =>
      `🛍️ ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`
  )
  .join("\n")}

💰 *Total:* ₹${total}
💳 *Payment Method:* ${paymentMethod}
📱 *Phone:* ${address.phone}
🏠 *Address:*
${address.street}, ${address.city}, ${address.state} - ${address.zip}
`;

      const whatsappNumber = "7708751708";
      const encodedMessage = encodeURIComponent(message);
      window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-4 pb-8 font-sans">
      <style>{`
        .slide-enter {
          opacity: 0;
          transform: translateX(100%);
        }
        .slide-enter-active {
          opacity: 1;
          transform: translateX(0);
          transition: all 300ms ease-in-out;
        }
        .slide-exit {
          opacity: 1;
          transform: translateX(0);
        }
        .slide-exit-active {
          opacity: 0;
          transform: translateX(-100%);
          transition: all 300ms ease-in-out;
        }
      `}</style>

      {/* Progress Bar */}
      <div className="w-full h-2 mb-4 bg-gray-200 relative">
        <div
          className="absolute top-0 left-0 h-2 bg-pink-500 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: isCheckout ? "100%" : "50%" }}
        />
      </div>

      {/* Toggle Tabs */}
      <div className="flex justify-between mb-6 text-lg font-semibold">
        <button
          onClick={() => setIsCheckout(false)}
          className={`w-1/2 text-center py-2 ${
            !isCheckout ? "text-pink-600 border-b-2 border-pink-500" : "text-gray-500"
          }`}
        >
          Your Cart
        </button>
        <button
          onClick={() => setIsCheckout(true)}
          className={`w-1/2 text-center py-2 ${
            isCheckout ? "text-pink-600 border-b-2 border-pink-500" : "text-gray-500"
          }`}
        >
          Checkout
        </button>
      </div>

      <SwitchTransition mode="out-in">
        <CSSTransition key={isCheckout ? "checkout" : "cart"} timeout={300} classNames="slide">
          <div>
            {loading ? (
              <div className="text-center text-pink-500">Loading...</div>
            ) : cartItems.length === 0 ? (
              <div className="text-center text-gray-500">Your cart is empty.</div>
            ) : isCheckout ? (
              <form
                onSubmit={handleCheckout}
                className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-800">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="name" placeholder="Full Name" value={address.name} onChange={handleChange} required className="p-2 border rounded" />
                  <input name="phone" placeholder="WhatsApp Number" value={address.phone} onChange={handleChange} required className="p-2 border rounded" />
                  <input name="street" placeholder="Street Address" value={address.street} onChange={handleChange} required className="p-2 border rounded col-span-2" />
                  <input name="city" placeholder="City" value={address.city} onChange={handleChange} required className="p-2 border rounded" />
                  <input name="state" placeholder="State" value={address.state} onChange={handleChange} required className="p-2 border rounded" />
                  <input name="zip" placeholder="ZIP Code" value={address.zip} onChange={handleChange} required className="p-2 border rounded" />
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mt-4">Payment Method</h2>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" value="Online" checked={paymentMethod === "Online"} onChange={(e) => setPaymentMethod(e.target.value)} /> Online
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery
                  </label>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mt-6">Order Summary</h3>
                <ul className="space-y-2">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-semibold mt-4">
                  <span>Total:</span>
                  <span>₹{calculateTotalPrice()}</span>
                </div>

                <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded">
                  Place Order
                </button>
              </form>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-4">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold text-gray-800">₹{item.price * item.quantity}</p>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove item"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <span className="font-semibold text-lg">Total: ₹{calculateTotalPrice()}</span>
                  <button
                    onClick={() => setIsCheckout(true)}
                    className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded"
                  >
                    Go to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default Review;
