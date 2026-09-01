import express from "express";
import { getServicos, addServico, updateServico, deleteServico } from "../controlers/services.js";

const router = express.Router();

router.get("/", getServicos);
router.post("/", addServico);
router.put("/:id", updateServico);
router.delete("/:id", deleteServico);

export default router;