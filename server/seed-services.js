require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("./Models/serviceModel");

const samples = [
  { name: "Tap & Leak Repair", description: "Fix leaking taps, pipes and fittings", category: "Plumber", price: 299, duration: 60 },
  { name: "Switch & Wiring Fix", description: "Switches, sockets, MCB and wiring issues", category: "Electrician", price: 349, duration: 60 },
  { name: "Furniture Assembly", description: "Bed, wardrobe, table assembly and repair", category: "Carpenter", price: 499, duration: 120 },
  { name: "Full Home Cleaning", description: "Deep cleaning for 1-3 BHK homes", category: "Cleaner", price: 1499, duration: 240 },
  { name: "Wall Painting (per room)", description: "Single room repaint with putty + 2 coats", category: "Painter", price: 3999, duration: 480 },
  { name: "AC Service & Gas Check", description: "Split/window AC foam service + cooling check", category: "AC Repair", price: 599, duration: 90 },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const count = await Service.countDocuments();
    if (count > 0) {
      console.log(`Services already exist: ${count}. Skipping seed.`);
    } else {
      await Service.insertMany(samples);
      console.log(`Seeded ${samples.length} services.`);
    }
    process.exit(0);
  } catch (e) {
    console.error("Seed failed:", e.message);
    process.exit(1);
  }
})();
