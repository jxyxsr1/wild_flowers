import React, { useState, useEffect } from "react";
import { ChevronDown , Heart, ShoppingCart } from "lucide-react"; // Dropdown icon
import logo from "../../assets/logooo.png"; // Ensure correct path
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Debugging: Check if Navbar renders
  useEffect(() => {
    console.log("Navbar rendered ✅");
  }, []);

  return (
    <main className="shadow-lg bg-white/50 backdrop-blur-lg absolute w-full z-50 top-0">
      <div className="container">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Salon Logo" className="h-20 w-auto max-w-[100px]" />
          </Link>

          {/* Navigation Menu */}
          <div className="block"> {/* Removed `hidden sm:block` */}
            <ul className="flex font-semibold justify-center items-center gap-4 relative">
              {/* Home Link */}
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-gray-900 px-4 py-4 inline-block select-none"
                >
                  Home
                </Link>
              </li>

              {/* Dropdowns */}
              {[
                { label: "Services", items: ["Skin Care", "Makeup", "Fashion"] },
                
              ].map((menu, index) => (
                <li key={index} className="relative dropdown">
                  <button
                    onClick={() => toggleDropdown(menu.label)}
                    className="text-gray-700 hover:text-gray-900 px-4 py-4 inline-flex items-center gap-1 select-none"
                  >
                    {menu.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        openDropdown === menu.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === menu.label && (
                    <ul className="absolute left-0 mt-2 w-44 bg-pink-100/40 backdrop-blur-md shadow-lg rounded-2xl border border-pink-200/60 transition-all duration-300 ease-in-out animate-fade-slide">
                      {menu.items.map((item, i) => (
                        <li key={i}>
                          <Link
                            to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block px-4 py-3 text-gray-700 cursor-pointer rounded-lg transition-all duration-300 ease-in-out hover:bg-pink-200/50 hover:shadow-md hover:shadow-pink-300/40 hover:scale-[1.02]"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              {/* About Us Link */}
              <li>
                <Link
                  to="/about-us"
                  className="text-gray-700 hover:text-gray-900 px-4 py-4 inline-block select-none"
                >
                  About Us
                </Link>
              </li>

              {/* ✅ FAQ Link (Fixed) */}
              <li>
                <Link
                  to="/faq"
                  className="text-gray-700 hover:text-gray-900 px-4 py-4 inline-block select-none"
                >
                  FAQ
                </Link>
              </li>
                  <li>
                <Link
                  to="/wishlist"
                  className="text-gray-700 hover:text-pink-600 px-4 py-4 inline-flex items-center justify-center transition-transform hover:scale-110"
                  title="Wishlist"
                >
                  <Heart size={22} />
                </Link>
              </li>

              {/* Cart 🛒 */}
              <li>
                <Link
                  to="/review"
                  className="text-gray-700 hover:text-pink-600 px-4 py-4 inline-flex items-center justify-center transition-transform hover:scale-110"
                  title="Cart"
                >
                  <ShoppingCart size={22} />
                </Link>
              </li>
              {/* Login Button Redirecting to Login Page */}
              <li>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 px-4 py-4 inline-block select-none"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </main>
  );
};

export default Navbar;