import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Form } from "../components/addcars/Form";

interface FormState {
  marca: string;
  modelo: string;
  ano: string;
}

export default function App() {
  const [form, setForm] = useState<FormState>({
    marca: "",
    modelo: "",
    ano: "",
  });
  const [imagem, setImagem] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>("");
  const [error, setError] = useState<string | null>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("marca", form.marca);
    formData.append("modelo", form.modelo);
    formData.append("ano", form.ano);
    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      const res = await fetch("http://localhost:3001/api/cars", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao adicionar o carro");

      setForm({ marca: "", modelo: "", ano: "" });
      setImagem(null);

      // ✅ exibir mensagem de sucesso
      setMessage("Carro adicionado com sucesso!");
      setTimeout(() => setMessage(null), 3000);
      setError(null);
    } catch (err) {
      // ❌ exibir mensagem de erro
      setError("Erro ao adicionar carro.");
      setTimeout(() => setMessage(null), 3000);
      setMessage(null);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  return (
    <div className="mx-auto flex flex-row items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] ">
        <Form
          form={form}
          setForm={setForm}
          imagem={imagem}
          setImagem={setImagem}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
        />
      </div>
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
