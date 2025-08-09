import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import Car, { ICar } from "./models/Car";

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar:", err));

// Listar todos os carros
app.get(
  "/api/cars",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cars: ICar[] = await Car.find({});
      res.json(cars);
    } catch (error) {
      next(error);
    }
  }
);

// Adicionar um carro
app.post(
  "/api/cars",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { marca, modelo, ano, imagem } = req.body as ICar;
      const newCar = new Car({ marca, modelo, ano, imagem });
      const savedCar = await newCar.save();
      res.json(savedCar);
    } catch (error) {
      next(error);
    }
  }
);

// Buscar carro por ID
app.get(
  "/api/cars/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await Car.findById(req.params.id);
      if (car) res.json(car);
      else res.status(404).json({ error: "Carro não encontrado" });
    } catch (error) {
      next(error);
    }
  }
);

// Middleware de erro
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error.message);
  res.status(500).json({ error: "Ocorreu um erro no servidor" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
