import React from "react";
import bgImage from "../assets/newsletter.jpg"; // Ensure correct path

const Newsletter = () => {
  return (
    <div
      className="relative bg-cover bg-center text-white py-32 px-6 flex justify-center items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-center font-[Poppins]">
        <h1 className="text-3xl font-medium uppercase tracking-widest text-gray-200 mb-3">
          CONNECT WITH US
        </h1>

        <h2 className="text-5xl font-bold mb-4 tracking-wide text-black">
          Stay Radiant & Beautiful
        </h2>

        <p className="text-lg mb-6 leading-relaxed text-gray-200">
          Receive expert beauty tips, exclusive offers, and the latest updates on our premium skincare, makeup, and hair care services. Elevate your beauty experience with us.
        </p>

        {/* Email Input Field */}
        <div className="flex w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 text-gray-800 focus:outline-none"
          />
          <button className="px-6 py-3 bg-pink-600 text-white font-medium hover:bg-pink-700 transition-all">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
