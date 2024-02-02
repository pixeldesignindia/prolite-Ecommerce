import express from "express";
import { deleteAdress, editAddress, getAllAdressByUser, newAddress } from "../controllers/address.js";
const app = express.Router();





app.post("/new",newAddress);
app.get("/all-address/:id",getAllAdressByUser)

app.route("/:id").delete(deleteAdress).put(editAddress)


export default app;