const production = {
  url: "https://bookstore-service-krishangk9964.onrender.com",
};
const development = {
  url: "http://localhost:5000",
};

export const config = process.env.NODE_ENV === "development" ? development : production;
