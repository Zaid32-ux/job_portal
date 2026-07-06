import express from "express";
import {
  analyzeResume,
  getHistory,
  deleteReport,
} from "../controllers/atsController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/analyze",
  isAuthenticated,
  analyzeResume
);

router.get(
  "/history",
  isAuthenticated,
  getHistory
);

router.delete(
  "/:id",
  isAuthenticated,
  deleteReport
);

export default router;