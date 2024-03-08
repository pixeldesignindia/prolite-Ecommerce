import express from "express";

const app = express.Router();

import { adminOnly } from "../middlewares/auth.js";
import { dateWiseTransactions, getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from "../controllers/statistics.js";



app.get("/dashboardStats",adminOnly,getDashboardStats)
app.get("/pieChart",adminOnly,getPieCharts)
app.get("/lineChart",adminOnly,getLineCharts)
app.get("/barChart",adminOnly,getBarCharts)
app.get("/dateWiseTransactions",dateWiseTransactions)
export default app;