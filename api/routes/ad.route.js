import express from "express";
import {
  getAd,
  getAds
  // Import the updateAd controller function
} from "../controllers/ad.controller.js";

const router = express.Router();

router.get("/single/:id", getAd);
router.get("/", getAds);


export default router;
