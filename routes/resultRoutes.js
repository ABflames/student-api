import { Router } from "express";
import { getAllResults } from "../controllers/resultController.js";

const router = Router();

router.get("/", getAllResults);

export default router;