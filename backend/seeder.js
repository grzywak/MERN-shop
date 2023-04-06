import dotenv from "dotenv";
import colors from "colors";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("sample data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}.red.inverse`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();

    console.log("data destoyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}.red.inverse`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
