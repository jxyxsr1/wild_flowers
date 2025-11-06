import React from "react";
import { motion } from "framer-motion";
import salon from "../assets/salon.jpg"; // Make sure you have the image in the correct path

const FeatureBox = () => {
  return (
    <header className="bg-pink-100 shadow-lg py-6 mt-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        
        {/* Left Side - Description */}
        <div className="w-1/2">
          <h1 className="text-4xl font-bold text-black-700"> Step into Wildflower Salon, where beauty meets tranquility!</h1>
          <p className="text-gray-600 mt-3 text-lg">
            At Wildflower Salon, beauty is an experience. From the moment you enter, you're welcomed into a serene, luxurious space with soft pastel walls, floral accents, and warm lighting that creates a soothing ambiance. The subtle aroma of fresh flowers and essential oils, paired with gentle background music, makes every visit a relaxing escape. Our elegant mirrors, chic décor, and cozy seating ensure comfort, while our passionate beauty artists bring out your natural radiance with expert techniques. Whether it’s a bridal makeover or an everyday glow, Wildflower Salon is where elegance, creativity, and individuality bloom effortlessly.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 flex justify-end">
          <motion.img 
            src={salon}  // Using imported image
            alt="salon" 
            className="w-[500px] h-[500px] object-cover rounded-lg shadow-md"
            initial={{ y: -100, opacity: 0 }}  // Starts off-screen (above)
            animate={{ y: 0, opacity: 1 }}    // Moves to normal position
            transition={{ duration: 0.8, ease: "easeOut" }} // Smooth drop
          />
        </div>
      </div>
    </header>
  );
};

export default FeatureBox;
