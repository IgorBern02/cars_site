import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Form } from "../components/addcars/Form";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

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
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const API_URL = import.meta.env.VITE_API_URL;

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
      const res = await fetch(`${API_URL}/api/cars`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao adicionar o carro");

      setForm({ marca: "", modelo: "", ano: "" });
      setImagem(null);
      setPreview(null);
      setFileName("");
      setMessage("Carro adicionado com sucesso!");
      setTimeout(() => setMessage(null), 3000);
      console.log(import.meta.env.VITE_API_URL);
    } catch (err) {
      setError("Erro ao adicionar carro.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImagem(e.target.files[0]);
  //   }
  // };

  const formatFileName = (name: string) => {
    const cleanName = name
      .normalize("NFD") // separa acentos
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/\s+/g, "_") // substitui espaços por underline
      .toLowerCase();

    const timestamp = Date.now();
    const extension = name.split(".").pop(); // pega extensão
    return `${cleanName.split(".")[0]}_${timestamp}.${extension}`;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const originalFile = e.target.files[0];
      const formattedName = formatFileName(originalFile.name);

      // cria um novo File com o nome formatado
      const fileWithFormattedName = new File([originalFile], formattedName, {
        type: originalFile.type,
      });

      setImagem(fileWithFormattedName);
      setPreview(URL.createObjectURL(fileWithFormattedName));
    } else {
      setImagem(null);
      setPreview(null);
    }
  };

  // liberar memória quando trocar de imagem ou desmontar componente
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-cars-gradient">
      <header className="p-4">
        <Link
          to="/"
          className="inline-block p-2 rounded cursor-pointer transition-all duration-300 shadow-lg bg-black/20 hover:bg-black/40"
        >
          <FaAngleLeft className="text-white" size={25} />
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center">
        <Form
          form={form}
          setForm={setForm}
          imagem={imagem}
          preview={preview}
          setPreview={setPreview}
          setImagem={setImagem}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          fileName={fileName}
          setFileName={setFileName}
        />
      </main>

      {(message || error) && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black/50 absolute inset-0"></div>
          <div className="bg-white rounded-lg p-6 z-10 max-w-sm w-full text-center shadow-lg">
            <h2
              className={`text-lg font-semibold mb-2 ${
                message ? "text-green-600" : "text-red-600"
              }`}
            >
              {message ? "Sucesso!" : "Erro!"}
            </h2>
            <p className="text-gray-800">{message || error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
