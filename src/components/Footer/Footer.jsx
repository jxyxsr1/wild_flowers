import { Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        
        {/* Left Side: Logo & Description */}
        <div className="text-right flex-1 ml-10 md:ml-30">
  <h2 className="text-xl font-bold">WILD FLOWER</h2>
  <p className="text-gray-400 mt-2">Bloom. Glow. Shine. Slay.</p>
  <p className="text-gray-400 mt-2">wildflower@gmail.in</p>
</div>


        {/* Center: Social Icons */}
        <div className="flex-1 flex flex-col items-center">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-3 mt-2">
            <a href="#" className="text-gray-400 hover:text-white"><Facebook /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram /></a>
            <a href="#" className="text-gray-400 hover:text-white"><MessageCircle /></a>
          </div>
        </div>

        {/* Right Side: Quick Links */}
        <div className="text-left flex-1">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>

      </div>

      {/* Copyright Section (Below Everything) */}
      <div className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} WildFlower. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
