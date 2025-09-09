import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import {addExpense, getAllExpense, removeExpense, updateExpense, markAsDoneOrUndone} from '../controllers/expense.controller.js';
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, addExpense);
router.route("/getAll").get(isAuthenticated, getAllExpense);
router.route("/remove/:id").delete(isAuthenticated, removeExpense);
router.route("/update/:id").put(isAuthenticated, updateExpense);
router.route("/:id/done").put(isAuthenticated, markAsDoneOrUndone);

export default router;
