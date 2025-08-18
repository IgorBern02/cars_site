import type { ChangeEvent, FormEvent } from "react";

// Input
export type PropsInput = {
  type: string;
  name?: string;
  placeholderLabel?: string;
  placeholderInput?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  accept?: string;
};

// Button
export type PropsButton = {
  text: string;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
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
  preview?: string | null;
};
