import { Router } from "express";
import { getExpensesByCategory } from "../controllers/expenseController";

const router = Router();

router.get("/", getExpensesByCategory); //http://localhost:8000/dashboard/<whateveruputhere>

export default router;
