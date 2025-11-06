import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Sparkles, CalendarHeart } from "lucide-react";
import gif from "../../assets/download.gif";
import { auth, db } from "../../firebase";
import { collection, setDoc, getDocs,doc} from "firebase/firestore";


const appointmentTypes = [
  "Skincare Treatment",
  "Bridal Makeup",
  "Partywear Makeup",
  "Makeup Transformation",
  "Kids Costume",
];

const dealerAvailableDates = [
  "2025-04-10",
  "2025-04-13",
  "2025-04-15",
  "2025-04-20",
  "2025-04-25",
  "2025-05-01",
  "2025-06-10",
  "2025-07-05",
  "2025-08-20",
];

const allowedDates = dealerAvailableDates.map((date) => new Date(date));

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    appointmentType: "",
    date: null,
    time: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleDateChange = (selectedDate) => {
  setFormData({ ...formData, date: selectedDate });
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  const currentUser = auth.currentUser;
  if (!currentUser) {
    alert("Please log in to book an appointment.");
    return;
  }

  try {
    const userId = currentUser.uid;

    // 1. Get existing appointments
    const appointmentsRef = collection(db, "users", userId, "appointments");
    const snapshot = await getDocs(appointmentsRef);
    const appointmentCount = snapshot.size; // count of existing docs

    // 2. Create document ID like 'appointment 1', 'appointment 2', etc.
    const docId = `appointment ${appointmentCount + 1}`;

    // 3. Save the new appointment with that ID
    await setDoc(doc(appointmentsRef, docId), {
      name: formData.name,
      phone: formData.phone,
      appointmentType: formData.appointmentType,
      date: formData.date.toISOString(),
      time: formData.time,
      notes: formData.notes || "",
      createdAt: new Date(),
    });

    setSubmitted(true);
  } catch (error) {
    console.error("Error saving appointment:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex justify-center items-center p-6 mt-20">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-10">
        <div className="hidden md:flex flex-col items-center w-1/2">
          <img
            src={gif}
            alt="Appointment illustration"
            className="w-80 mb-4 rounded-xl shadow-lg"
          />
          <p className="text-center text-pink-500 font-semibold">
            Because you deserve a touch of luxury!
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold text-center text-pink-600 mb-8 flex items-center justify-center gap-2">
            <Sparkles className="text-pink-500" /> Book an Appointment
          </h2>

          {submitted ? (
            <div className="text-center text-green-600 text-xl">
              🎉 Appointment booked successfully! We'll get in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Select Appointment Type
                </label>
                <select
                  name="appointmentType"
                  value={formData.appointmentType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 bg-pink-50"
                >
                  <option value="">-- Select --</option>
                  {appointmentTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 bg-pink-50"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g., +91 98765 43210"
                  className="w-full border border-gray-300 rounded-xl p-3 bg-pink-50"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <CalendarHeart className="text-pink-500" /> Select Available Date
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  includeDates={allowedDates}
                  placeholderText="Click to select a date"
                  className="w-full border border-gray-300 rounded-xl p-3 bg-pink-50"
                  dateFormat="yyyy-MM-dd"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  minDate={new Date()}
                  maxDate={new Date("2025-12-31")}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Preferred Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 bg-pink-50"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-pink-50"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition shadow-md"
              >
                Confirm Appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
