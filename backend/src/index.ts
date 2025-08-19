import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import Car, { ICar } from "./models/Car";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Pasta onde salvar
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Pega a extensão original (.jpg, .png, etc)
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(express.json());

// Serve a pasta uploads para acessar as imagens
app.use("/uploads", express.static(path.resolve("uploads")));

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar:", err));

// Listar todos os carros
app.get("/", (req: Request, res: Response) => {
  res.send("API de Carros");
});

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

// Adicionar um carro
app.post(
  "/api/cars",
  upload.single("imagem"),
  async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {
      const { marca, modelo, ano } = req.body as ICar;
      const img = req.file;

      if (!img || !marca || !modelo || !ano) {
        return res.status(400).json({ error: "Dados incompletos" });
      }

      const newCar = new Car({
        marca,
        modelo,
        ano,
        imagem: `/uploads/${img.filename}`,
      });

      const savedCar = await newCar.save();
      res.json(savedCar);
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
