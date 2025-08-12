import type { ChangeEvent, FormEvent } from "react";

// Input
export type PropsInput = {
  type: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Button
export type PropsButton = {
  text: string;
  type: "submit" | "reset" | "button";
};

// Form
export type PropsForm = {
  form: {
    marca: string;
    modelo: string;
    ano: string;
  };
  setForm: (form: PropsForm["form"]) => void;
  imagem: File | null;
  setImagem: (imagem: File | null) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
