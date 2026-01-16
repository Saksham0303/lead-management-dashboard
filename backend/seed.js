const mongoose = require("mongoose");
require("dotenv").config();
const Lead = require("./models/Lead");

const statuses = ["new", "contacted", "qualified", "converted"];
const companies = ["Acme", "Globex", "Initech", "Umbrella", "Hooli"];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected for seeding");

    await Lead.deleteMany();

    const leads = [];

    for (let i = 1; i <= 500; i++) {
      leads.push({
        name: `Lead ${i}`,
        email: `lead${i}@example.com`,
        phone: `99999${String(i).padStart(5, "0")}`,
        company: random(companies),
        status: random(statuses),
        source: "website",
      });
    }

    await Lead.insertMany(leads);
    console.log("Seeded 500 leads");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
