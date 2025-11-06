import React from "react";
import fashionbanner from "../../assets/fashion banner.jpg";
import westernWear from "../../assets/western-wear.jpg";
import traditionalLook from "../../assets/traditional-look.jpg";
import bridalLook from "../../assets/bridal-look.jpg";
import partyWear from "../../assets/party-wear.jpg";
import qualityImg from "../../assets/quality-image.jpg";
import blurredBanner from "../../assets/blurred-banner.jpg";
import fairyTale from "../../assets/fairy-tale.jpg";
import superhero from "../../assets/superhero.jpg";
import cultural from "../../assets/cultural.jpg";
import fantasy from "../../assets/fantasy.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FashionBanner = ({ banner }) => {
  return (
    <div className="bg-pink-100 min-h-screen">
      {/* Hero Section */}
      <div
        className="w-full h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${fashionbanner})` }}
      ></div>

      {/* Quote Section */}
      <div className="text-center text-gray-700 italic text-xl py-8">
        "Unleash your style with the latest trends!"
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 pb-8">
        <div className="text-center">
          <img src={westernWear} alt="Western Wear" className="w-full h-64 object-cover rounded-lg" />
          <p className="mt-2 text-lg font-semibold">Western Wear</p>
        </div>
        <div className="text-center">
          <img src={traditionalLook} alt="Traditional Look" className="w-full h-64 object-cover rounded-lg" />
          <p className="mt-2 text-lg font-semibold">Traditional Look</p>
        </div>
        <div className="text-center">
          <img src={bridalLook} alt="Bridal Look" className="w-full h-64 object-cover rounded-lg" />
          <p className="mt-2 text-lg font-semibold">Bridal Look</p>
        </div>
        <div className="text-center">
          <img src={partyWear} alt="Party Wear" className="w-full h-64 object-cover rounded-lg" />
          <p className="mt-2 text-lg font-semibold">Party Wear</p>
        </div>
      </div>
       {/* Quality Banner Section */}
      <div className="flex flex-col md:flex-row items-center bg-white shadow-xl p-12 mx-12 my-16">
        <motion.img 
          src={qualityImg} 
          alt="Quality Clothing" 
          className="w-full md:w-1/2 h-[400px] object-cover"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />
        <div className="md:w-1/2 md:pl-12 text-gray-900">
          <h2 className="text-4xl font-bold mb-6">Premium Quality Clothing</h2>
          <p className="text-xl leading-relaxed">Experience the luxury of high-quality fabrics, tailored to perfection. Our clothing ensures comfort, durability, and elegance, making every outfit worth the investment.</p>
          <p className="mt-6 text-xl font-semibold">Worth every penny for those who value style and substance.</p>
        </div>
      </div>
         {/* Kids Wear Section */}
<h2 className="text-center text-pink-600 text-4xl font-extrabold mb-8">Kids Wear</h2>
<div className="flex justify-center gap-12 px-12">
  {[
    { title: "Fairy Tale Theme", img: fairyTale, desc: "Magical outfits inspired by classic fairy tales." },
    { title: "Superhero Costumes", img: superhero, desc: "Powerful and bold superhero costumes for kids." },
    { title: "Cultural Attire", img: cultural, desc: "Traditional and vibrant cultural outfits." },
    { title: "Fantasy Characters", img: fantasy, desc: "Whimsical and dreamy fantasy-themed costumes." },
  ].map((item, index) => (
    <motion.div
      key={index}
      whileTap={{ scale: 1.1 }}
      className="text-center border-4 border-gray-400 rounded-lg p-6 shadow-xl w-72"
    >
      <img src={item.img} alt={item.title} className="w-full h-64 object-cover rounded-lg" />
      <p className="mt-4 text-2xl font-semibold">{item.title}</p>
      <p className="text-lg text-gray-700 mt-3">{item.desc}</p>
    </motion.div>
  ))}
</div>


      {/* Blurred Banner Section */}
      <div
        className="relative w-full h-[350px] flex flex-col items-center justify-center text-white text-center px-6 mt-16"
        style={{ backgroundImage: `url(${blurredBanner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Book Your Appointment</h2>
          <p className="text-lg mb-6">Get a custom-designed outfit for your special event. Schedule a consultation today!</p>
          <Link to="/book-appointment">
  <button className="bg-white text-black py-2 px-5 text-lg font-semibold rounded-lg hover:bg-gray-300">
    Book Now
  </button>
</Link>

        </div>
      </div>
    </div>
  );
};

export default FashionBanner;
