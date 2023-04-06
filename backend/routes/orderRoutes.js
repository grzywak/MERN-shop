import express from "express";
const router = express.Router();
import { createOrder, getOrderById } from "../controllers/orderController.js";

router.route("/").post(createOrder);
router.route("/:id").get(getOrderById);

export default router;
