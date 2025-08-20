// src/server.ts
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import streamifier from "streamifier";
import Car, { ICar } from "./models/Car";
import { v2 as cloudinary } from "cloudinary";

// Tipagem para requests com Multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Tipagem para resultado de upload Cloudinary
interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder?: string;
  original_filename: string;
}

const app = express();

const allowedOrigins = [
  "https://cars-site-ochre.vercel.app",
  "http://localhost:5173",
  "https://cars-site-8wk5.onrender.com",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS não permitido"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// Multer em memória (para funcionar na Vercel)
const upload = multer({ storage: multer.memoryStorage() });

// Configuração Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ================== ROTAS ==================

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 API de Carros rodando!");
});

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

// Adicionar um carro (com upload para Cloudinary)
app.post(
  "/api/cars",
  upload.single("imagem"),
  async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {
      const { marca, modelo, ano } = req.body;
      const file = req.file;

      if (!file || !marca || !modelo || !ano) {
        return res.status(400).json({ error: "Dados incompletos" });
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "cars" },
        async (
          error: Error | undefined,
          result: CloudinaryUploadResult | undefined
        ) => {
          if (error || !result) {
            console.error("❌ Erro Cloudinary:", error || "Resultado vazio");
            return res.status(500).json({ error: "Falha no upload da imagem" });
          }

          const newCar = new Car({
            marca,
            modelo,
            ano,
            imagem: result.secure_url,
          });

          const savedCar = await newCar.save();
          res.json(savedCar);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error("🔥 Erro no servidor:", error.message);
      else console.error("🔥 Erro desconhecido no servidor:", error);
      next(error);
    }
  }
);

// Middleware de erro
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    console.error("🔥 Erro no servidor:", error.message);
    res.status(500).json({ error: error.message });
  } else {
    console.error("🔥 Erro desconhecido no servidor:", error);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
});

// ================== SERVER INIT ==================
const PORT = process.env.PORT || 3001;

async function startServer() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("❌ MONGODB_URI não definido!");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Conectado ao MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  }
}

startServer();
