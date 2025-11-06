import facialTreatment from "../assets/facial_treatment.jpg";
import antiAging from "../assets/anti_aging.jpg";
import acneTreatment from "../assets/acne_treatment.jpg";
import hydrationTherapy from "../assets/hydration_therapy.jpg";
import glowBoost from "../assets/glow_boost.jpg";
import skincaree from "../assets/skincare_main.jpg";

export const services = [
  { title: "Facial Treatments", category: "Moisturizer", description: "Revitalize your skin.", image: facialTreatment, badge: "30% Off", price: 500, discount: 30, rating: 4.5 },
  { title: "Toner", category: "Toner", description: "Nourish your skin with toner.", image: skincaree, badge: "30% Off", price: 500, discount: 30, rating: 4.5 },
  { title: "Anti-Aging Solutions", category: "Anti-Aging", description: "Reduce wrinkles.", image: antiAging, badge: "Black Friday Sale", price: 500, discount: 10, rating: 4.7 },
  { title: "Acne Treatment", category: "Moisturizer", description: "Clear your skin.", image: acneTreatment, badge: "Limited Time", price: 500, discount: 20, rating: 4.6 },
  { title: "Hydration Therapy", category: "Moisturizer", description: "Deep hydration.", image: hydrationTherapy, price: 500, rating: 4.8 },
  { title: "Glow Boost Facial", category: "Anti-Aging", description: "Glow up time.", image: glowBoost, badge: "Special Deal", price: 500, discount: 15, rating: 4.9 },
];
