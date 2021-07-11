const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30 + 10);
    const camp = new Campground({
      author: "60d9d308c6af67ea9f3e4ef3",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis voluptatem impedit necessitatibus, alias accusamus nulla nesciunt in similique vel repellendus. Similique excepturi quisquam consectetur ut quia cumque enim nesciunt rem!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/pma-8/image/upload/v1625768833/YelpCamp/nuhmyylmnlqjkfugxuca.jpg",
          filename: "YelpCamp/nuhmyylmnlqjkfugxuca",
        },
        {
          url: "https://res.cloudinary.com/pma-8/image/upload/v1625768834/YelpCamp/ym4sohwmr23p3xlktott.jpg",
          filename: "YelpCamp/ym4sohwmr23p3xlktott",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
