import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Star Icons

const reviews = [
    { text: ["Absolutely love the facials here!", "My skin has never felt so refreshed."], author: "Emily W.", rating: 5 },
    { text: ["The best manicure I've ever had!", "The staff is so friendly and skilled."], author: "Sophia L.", rating: 4.5 },
    { text: ["I bought the organic face serum.", "It works wonders!"], author: "Jessica M.", rating: 5 },
    { text: ["Incredible hairstyling service.", "I walked out feeling like a queen!"], author: "Rachel T.", rating: 4 },
    { text: ["The makeup artists are magicians!", "My bridal look was flawless."], author: "Amanda B.", rating: 5 },
    { text: ["Such a relaxing spa experience.", "Their skincare products are top-tier!"], author: "Natalie P.", rating: 4.5 }
];

const CustomerReviews = () => {
    return (
        <section id="customer-reviews" className="p-12 bg-pink-50 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-pink-600 mb-8 uppercase tracking-wide">Customer Testimonials</h2>

            {/* 📌 Professional Review Box Container with Pinkish Shadow */}
            <div className="w-full max-w-6xl bg-white shadow-[0px_4px_20px_rgba(245,150,170,0.4)] rounded-xl border border-pink-300 p-8 overflow-hidden">
                <div className="relative w-full overflow-hidden">
                    <div className="flex whitespace-nowrap animate-scroll">
                        {/* Duplicating Reviews for Infinite Loop */}
                        {[...reviews, ...reviews].map((review, index) => (
                            <div 
                                key={index} 
                                className="w-80 h-80 mx-6 flex-shrink-0 bg-gradient-to-b from-pink-100 to-white p-6 shadow-md shadow-pink-200/50 text-center rounded-xl border border-pink-300 flex flex-col items-center justify-center"
                            >
                                {/* Elegant Star Rating */}
                                <div className="flex justify-center mb-3">
                                    {Array.from({ length: Math.floor(review.rating) }, (_, i) => (
                                        <FaStar key={i} className="text-yellow-500 text-2xl drop-shadow-sm" />
                                    ))}
                                    {review.rating % 1 !== 0 && <FaStarHalfAlt className="text-yellow-500 text-2xl drop-shadow-sm" />}
                                </div>

                                {/* Wrapped Review Content */}
                                <div className="text-gray-700 text-lg font-medium px-6 leading-relaxed">
                                    {review.text.map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                                <h4 className="mt-4 font-semibold text-pink-700 text-lg">- {review.author}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CSS Animation for Infinite Scrolling */}
            <style>
                {`
                    @keyframes scroll {
                        from { transform: translateX(0); }
                        to { transform: translateX(-50%); }
                    }

                    .animate-scroll {
                        display: flex;
                        width: max-content;
                        animation: scroll 25s linear infinite;
                    }
                `}
            </style>
        </section>
    );
};

export default CustomerReviews;
