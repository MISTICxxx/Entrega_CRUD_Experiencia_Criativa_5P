import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/services.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/servicos", serviceRoutes);

app.listen(8800, () => {
  console.log("Servidor backend rodando na porta 8800!");
});