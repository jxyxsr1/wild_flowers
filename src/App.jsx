import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import BookAppointment from "./components/Pages/BookAppointment";
import BuyNow from "./components/Pages/Buynow";
import Home from "./components/Pages/Home";
import Hero from "./components/Pages/Hero";
import Login from "./components/LoginPopup/Login";
import Signin from "./components/LoginPopup/Signin";
import Footer from "./components/Footer/Footer";
import Skincare from "./components/Pages/Skincare";
import Makeup from "./components/Pages/Makeup";
import Fashion from "./components/Pages/Fashion";
import Wishlist from "./components/Pages/Wishlist";
import Discounts from "./components/Pages/Discounts";
import Coupons from "./components/Pages/Coupons";
import LatestPosts from "./components/Pages/LatestPosts";
import Trending from "./components/Pages/Trending";
import OurStory from "./components/Pages/OurStory";
import AboutUs from "./components/Pages/AboutUs";
import Careers from "./components/Pages/Careers";
import Support from "./components/Pages/Support";
import FindUs from "./components/Pages/FindUs";
import Review from "./components/Pages/Review";
import FAQ from "./components/Pages/FAQ";
import ProductDetails from "./components/Pages/ProductDetails"; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/BuyNow" element={<BuyNow/>} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/skin-care" element={<Skincare />} />
        <Route path="/products/:productSlug" element={<ProductDetails />} />
        <Route path="/makeup" element={<Makeup />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/discounts" element={<Discounts />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/latest-posts" element={<LatestPosts />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/support" element={<Support />} />
        <Route path="/find-us" element={<FindUs />} />
        <Route path="/review" element={<Review/>}/>
        <Route path="/faq" element={<FAQ />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* <Route path="/paymentpage" element={<PaymentPage/>}/> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
