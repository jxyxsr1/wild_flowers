import React from "react";
import { motion } from "framer-motion";
import whoweare from "../assets/Whoweare.jpg";

const HeaderSection = () => {
  return (
    <header className="bg-pink-100 shadow-lg py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Left Side - Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-black-700">WHO ARE WE?</h1>
          <p className="text-gray-600 mt-4 text-lg leading-relaxed">
            Welcome to <span className="font-bold text-pink-600">Wildflower Salon</span>, where beauty blooms naturally! 
            We are a team of passionate artists dedicated to bringing out your unique radiance with expert makeup, hairstyling, 
            and personalized beauty services. Just like a wildflower, we believe in embracing individuality, confidence, and effortless elegance.
            Whether it’s a bridal makeover, everyday glam, or a bold transformation, we’re here to make you shine.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <motion.img 
            src={whoweare}  
            alt="Who We Are" 
            className="w-[400px] h-[400px] object-cover rounded-lg shadow-md"
            initial={{ y: -100, opacity: 0 }}  
            animate={{ y: 0, opacity: 1 }}    
            transition={{ duration: 0.8, ease: "easeOut" }} 
          />
        </div>

      </div>
    </header>
  );
};

export default HeaderSection;
