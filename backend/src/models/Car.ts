import { Schema, model, Document } from "mongoose";

export interface ICar extends Document {
  marca: string;
  modelo: string;
  ano: number;
  imagem: string;
}

const carSchema = new Schema<ICar>({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  ano: { type: Number, required: true },
  imagem: { type: String, required: true },
});

export default model<ICar>("Car", carSchema);
