import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hairstylistImage from "../assets/hairstylist.jpg";
import aariWorkerImage from "../assets/aariWorker.jpg";
import kidsFashionImage from "../assets/kidsFashion.jpg";
import makeupArtist2Image from "../assets/mmmakeupartist.jpg";
import beauticianImage from "../assets/makeupartist.jpg";
import nailArtImage from "../assets/nailart.jpg";
import fashionStylistImage from "../assets/fashionstylist.jpg";

const teamMembers = [
  { name: "Rida P.", title: "Hairstylist & Haircare Expert", experience: "8 years", description: "Rida specializes in trendy cuts and bridal hairstyles.", image: hairstylistImage },
  { name: "Meera S.", title: "Aari Work Designer", experience: "12 years", description: "Meera’s intricate embroidery makes every outfit a masterpiece.", image: aariWorkerImage },
  { name: "Diya K.", title: "Kids Fashion Designer", experience: "7 years", description: "Diya creates adorable and comfortable fashion for kids.", image: kidsFashionImage },
  { name: "Ayesha M.", title: "Professional Makeup Artist", experience: "9 years", description: "Ayesha’s artistry enhances natural beauty with expert makeup techniques.", image: makeupArtist2Image },
  { name: "Priya T.", title: "Beauty & Skincare Expert", experience: "8 years", description: "Priya offers expert skincare treatments for glowing skin.", image: beauticianImage },
  { name: "Riya J.", title: "Nail Art & Manicure Specialist", experience: "6 years", description: "Riya creates stunning nail art and elegant manicures.", image: nailArtImage },
  { name: "John D.", title: "Fashion Stylist", experience: "15 years", description: "John transforms clients into style icons with his impeccable taste.", image: fashionStylistImage },
];

const ExpertTeam = () => {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <header className="bg-pink-50 shadow-lg py-10">
      <div className="relative max-w-7xl mx-auto py-12">
        <h2 className="text-center text-4xl font-bold mb-8">Meet Our Experts</h2>
        {/* Scrollable Team Container */}
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-hidden no-scrollbar p-4"
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="min-w-[300px] bg-white shadow-xl rounded-lg p-6 text-center border border-gray-200 transform hover:scale-105 transition duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto object-cover rounded-full border-4 border-pink-500"
                />
                <h3 className="text-xl font-bold mt-4">{member.name}</h3>
                <p className="text-pink-600 font-semibold">{member.title}</p>
                <p className="text-gray-500 text-sm">{member.experience} experience</p>
                <p className="mt-2 text-gray-700">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => scroll(-300)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll(300)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </header>
  );
};

export default ExpertTeam;
