import React, { useState } from "react";
import { motion } from "framer-motion";
import ourTeamBanner from "../../assets/OUR TEAM.jpg";
import staffImage from "../../assets/staff.jpg";
import hairstylistImage from "../../assets/hairstylist.jpg";
import aariWorkerImage from "../../assets/aariworker.jpg";
import kidsFashionImage from "../../assets/kidsFashion.jpg";
import makeupArtist2Image from "../../assets/mmmakeupartist.jpg";
import nailArtImage from "../../assets/nailart.jpg";
import fashionStylistImage from "../../assets/fashionstylist.jpg";

const teamMembers = [
  { id: 1, name: "Sophia Patel", role: "Hairstylist", img: hairstylistImage },
  { id: 2, name: "Priya Sharma", role: "Aari Worker", img: aariWorkerImage },
  { id: 3, name: "Aditi Verma", role: "Kids Fashion Designer", img: kidsFashionImage },
  { id: 4, name: "Neha Kapoor", role: "Makeup Artist", img: makeupArtist2Image },
  { id: 5, name: "Ananya Rao", role: "Nail Artist", img: nailArtImage },
  { id: 6, name: "Tanya Malik", role: "Fashion Stylist", img: fashionStylistImage },
];

const AboutUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", query: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your query has been submitted!");
    setFormData({ name: "", email: "", query: "" });
  };

  return (
    <div className="w-full bg-[#FFFAFA]">
      {/* Banner */}
      <div className="w-full">
        <img src={ourTeamBanner} alt="Our Team Banner" className="w-full h-auto" />
      </div>

      {/* Behind The Scenes Section */}
      <div className="container mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between">
      <motion.div 
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-extrabold mb-6 text-gray-900 uppercase tracking-wide">
            Behind The Scenes
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            At <span className="font-bold">Wildflower Salon</span>, we believe that beauty is an art, and our team is dedicated to bringing that vision to life. With a passion for creativity and years of expertise, our stylists, makeup artists, and beauty professionals work tirelessly to ensure every client leaves feeling confident and radiant.  

From flawless hairstyles to breathtaking makeup looks, our experts stay ahead of the latest trends while personalizing every service to suit your unique style. Whether it's a wedding, a special event, or a self-care day, our team is committed to giving you an unforgettable experience.  

At Wildflower Salon, you’re not just a client—you’re family. We prioritize comfort, quality, and excellence in every service we provide. Come meet our talented team and let us enhance your natural beauty..
          </p>
        </motion.div>

        <motion.div 
          className="md:w-1/2 flex justify-center mt-6 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={staffImage} alt="Wildflower Staff" className="w-full md:w-2/3 lg:w-3/4 h-auto rounded-xl shadow-lg" />
        </motion.div>
      </div>

      {/* Meet Our Experts Section */}
<div className="bg-[#FFF0F5] py-20 px-8">
  <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-12 uppercase tracking-wide">
    Meet Our Experts
  </h2>

  <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 px-6">
    {teamMembers.map((member) => (
      <motion.div 
        key={member.id} 
        className="text-center transform transition duration-300 hover:scale-105"
      >
        <img 
          src={member.img} 
          alt={member.name} 
          className="w-full h-96 object-cover border-4 border-gray-300 shadow-md"
        />
        <h3 className="mt-6 text-3xl font-semibold text-gray-900">{member.name}</h3>
        <p className="text-gray-700 text-xl font-medium">{member.role}</p>
        <p className="mt-4 text-gray-800 text-lg leading-relaxed px-4">
          {member.description}
        </p>
      </motion.div>
    ))}
  </div>
</div>


      {/* Post Your Queries Section */}
      <div className="bg-white py-16 px-6">
        <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-10 uppercase tracking-wide">
          Post Your Queries
        </h2>

        <motion.form 
          className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label className="block text-gray-800 text-lg font-semibold mb-2">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-800 text-lg font-semibold mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-800 text-lg font-semibold mb-2">Your Query</label>
            <textarea 
              name="query"
              value={formData.query}
              onChange={handleChange}
              required
              className="w-full p-3 h-32 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="Enter your query"
            ></textarea>
          </div>

          <motion.button 
            type="submit"
            className="w-full py-3 bg-pink-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Query
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default AboutUs;
