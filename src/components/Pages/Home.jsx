import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../Navbar/Navbar";
import CustomerReviews from "../CustomerReviews";
import HeaderSection from "../HeaderSection";
import Newsletter from "../newsletter";
import Hero from "./Hero";
import Footer from "../Footer/Footer";
import bgImage from "../../assets/wildflower.png";
import whoweare from "../../assets/Whoweare.jpg";
import salon from "../../assets/salon.jpg";
import bridalMakeup from "../../assets/bridalmakeup.jpg";
import kidsCostume from "../../assets/kidscostume.jpg";
import aariWork from "../../assets/aariwork.jpg";
import everydayMakeup from "../../assets/everydaymakeup.jpg";
import makeoverSessions from "../../assets/makeoversessions.jpg";
import hairstylistImage from "../../assets/hairstylist.jpg";
import aariWorkerImage from "../../assets/aariworker.jpg";
import kidsFashionImage from "../../assets/Kidsfashion.jpg";
import makeupArtist2Image from "../../assets/mmmakeupartist.jpg";
import beauticianImage from "../../assets/makeupartist.jpg";
import nailArtImage from "../../assets/nailart.jpg";
import fashionStylistImage from "../../assets/fashionstylist.jpg";
import ExpertTeam from "../ExpertTeam";
import FeatureBox from "../FeatureBox";

const bgImageStyle = {
  width: "100%",
  height: "600px",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const services = [
  { title: "Bridal Makeup", image: bridalMakeup, description: "Look stunning on your special day with our expert bridal makeup." },
  { title: "Kids Costume Designing", image: kidsCostume, description: "Transforming little stars with magical makeovers!" },
  { title: "Aari Works", image: aariWork, description: "Intricate embroidery for traditional outfits." },
  { title: "Everyday Beauty", image: everydayMakeup, description: "Enhance your natural beauty with soft and subtle makeup." },
  { title: "Makeover Sessions", image: makeoverSessions, description: "Complete transformations tailored to your unique style." },
];

const Home = () => {
  const scrollRef = useRef(null);
  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-pink-100">
      <div style={bgImageStyle} className="w-full flex justify-center items-center">
        <Hero />
      </div>

      <header className="bg-pink-100 shadow-lg py-10">
        <p className="text-center text-4xl text-pink-700 mt-10 font-Orbitron animate-bounceIn">
          FLAWLESS BEAUTY, TIMELESS ELEGANCE
        </p>
        <p className="text-center text-3xl" style={{ fontFamily: "'Lavishly Yours', cursive" }}>
          Makeup that lets you slay with grace!!
        </p>
      </header>

      <header className="bg-pink-20 shadow-lg py-10">
        <section className="max-w-6xl mx-auto py-12">
          <h2 className="text-center text-4xl font-bold mb-8">OUR SERVICES</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service, index) => (
              <motion.div key={index} className="w-[300px] bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                  <Link to="/book-appointment">
  <button className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
    Book Now
  </button>
</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </header>
      <HeaderSection />
      <ExpertTeam />
      <FeatureBox />
      <CustomerReviews />
      <Newsletter />
    </main>
  );
};

export default Home;
