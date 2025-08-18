import type { ChangeEvent, FormEvent } from "react";
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
  setPreview: (preview: string | null) => void;
};
